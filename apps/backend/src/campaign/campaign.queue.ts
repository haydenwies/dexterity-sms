import { InjectQueue, Processor, WorkerHost } from "@nestjs/bullmq"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { Job, Queue } from "bullmq"

import { MessageStatus } from "@repo/types/message"

import { CampaignRepository } from "~/campaign/campaign.repository"
import { ContactService } from "~/contact/contact.service"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

const CAMPAIGN_QUEUE = "campaign-queue"

enum CAMPAIGN_QUEUE_JOB {
	SEND = "send",
	POLL_STATUS = "poll-status"
}

@Processor(CAMPAIGN_QUEUE)
class CampaignQueueConsumer extends WorkerHost {
	constructor(
		@InjectQueue(CAMPAIGN_QUEUE) private readonly campaignQueue: Queue,
		private readonly campaignRepository: CampaignRepository,
		private readonly contactService: ContactService,
		private readonly messageService: MessageService,
		private readonly senderService: SenderService,
		private readonly unsubscribeService: UnsubscribeService
	) {
		super()
	}

	async process(job: Job) {
		switch (job.name) {
			case CAMPAIGN_QUEUE_JOB.SEND: {
				const { organizationId, campaignId } = job.data //TODO: Validate job data
				return this.processSend(organizationId, campaignId)
			}
			case CAMPAIGN_QUEUE_JOB.POLL_STATUS: {
				const { organizationId, campaignId } = job.data //TODO: Validate job data
				return this.processPollStatus(organizationId, campaignId)
			}
		}
	}

	private async processSend(organizationId: string, campaignId: string): Promise<void> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")
		else if (!campaign.canSend()) throw new BadRequestException("Campaign cannot be sent")

		const { body } = campaign.send()

		const sender = await this.senderService.get(organizationId)

		const contacts = await this.contactService.getAll(organizationId)
		const deduplicatedContacts = this.contactService.deduplicateByPhone(contacts)

		// Filter out unsubscribed contacts
		const allowedContacts = await Promise.all(
			deduplicatedContacts.map(async (contact) => {
				if (!contact.phone) return null

				// Check if the contact is unsubscribed
				const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, contact.phone)
				return isUnsubscribed ? null : contact
			})
		)

		// Send messages only to subscribed contacts
		const validContacts = allowedContacts.filter((contact) => contact !== null)

		await Promise.all(
			validContacts.map((contact) =>
				this.messageService.send(organizationId, {
					from: sender.phone,
					to: contact.phone!,
					body,
					campaignId
				})
			)
		)

		// Schedule polling jobs to check message statuses and update campaign status
		// Poll at intervals to allow message processing and delivery status updates
		const pollingIntervals = [
			30 * 1000, // 30 seconds - initial check
			5 * 60 * 1000, // 5 minutes
			10 * 60 * 1000, // 10 minutes
			15 * 60 * 1000, // 15 minutes
			20 * 60 * 1000, // 20 minutes
			25 * 60 * 1000, // 25 minutes
			30 * 60 * 1000 // 30 minutes - final check
		]

		// Schedule all polling jobs with appropriate delays
		for (const delay of pollingIntervals)
			await this.campaignQueue.add(CAMPAIGN_QUEUE_JOB.POLL_STATUS, { organizationId, campaignId }, { delay })
	}

	private async processPollStatus(organizationId: string, campaignId: string): Promise<void> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		// Get all messages for this campaign and count their statuses
		const messages = await this.messageService.getMany(organizationId, { campaignId })
		if (messages.length === 0) return

		const statusCounts = {
			total: messages.length,
			sent: 0,
			delivered: 0,
			failed: 0,
			pending: 0
		}

		// Count each message status
		messages.forEach((message) => {
			switch (message.status) {
				case MessageStatus.SENT:
					statusCounts.sent++
					break
				case MessageStatus.DELIVERED:
					statusCounts.delivered++
					break
				case MessageStatus.FAILED:
					statusCounts.failed++
					break
				case MessageStatus.PENDING:
					statusCounts.pending++
					break
			}
		})

		// Update campaign status if needed
		const wasUpdated = campaign.updateStatusFromMessages({
			sent: statusCounts.sent,
			delivered: statusCounts.delivered,
			failed: statusCounts.failed,
			total: statusCounts.total
		})

		if (wasUpdated) await this.campaignRepository.update(campaign)
	}
}

export { CAMPAIGN_QUEUE, CAMPAIGN_QUEUE_JOB, CampaignQueueConsumer }

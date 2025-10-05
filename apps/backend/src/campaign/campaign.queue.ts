import { InjectQueue, Processor, WorkerHost } from "@nestjs/bullmq"
import { NotFoundException } from "@nestjs/common"
import { Job, Queue } from "bullmq"

import { MessageStatus } from "@repo/types/message"

import { CampaignRepository } from "~/campaign/repositories/campaign.repository"
import { ContactService } from "~/contact/contact.service"
import { Contact } from "~/contact/entities/contact.entity"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

const CAMPAIGN_QUEUE = "campaign-queue"

enum CampaignQueueJobName {
	SEND = "send",
	POLL_STATUS = "poll-status"
}

type CampaignQueueSendJobData = {
	organizationId: string
	campaignId: string
}

type CampaignQueuePollStatusJobData = {
	organizationId: string
	campaignId: string
}

type CampaignQueueJob =
	| Job<CampaignQueueSendJobData, void, CampaignQueueJobName.SEND>
	| Job<CampaignQueuePollStatusJobData, void, CampaignQueueJobName.POLL_STATUS>

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

	async process(job: CampaignQueueJob) {
		switch (job.name) {
			case CampaignQueueJobName.SEND: {
				return this.processSend(job.data)
			}
			case CampaignQueueJobName.POLL_STATUS: {
				return this.processPollStatus(job.data)
			}
		}
	}

	private async processSend(data: CampaignQueueSendJobData): Promise<void> {
		// Extract data
		const { organizationId, campaignId } = data

		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		// Transition from SCHEDULED to PROCESSING (following the state flow)
		campaign.setProcessing()
		await this.campaignRepository.update(campaign)

		const body = campaign.getBodyForSending()

		const sender = await this.senderService.get(organizationId)

		const contacts = await this.contactService.getAll(organizationId)
		const deduplicatedContacts = this.contactService.deduplicateByPhone(contacts)

		// Filter out unsubscribed contacts
		const allowedContacts: Contact[] = []
		await Promise.all(
			deduplicatedContacts.map(async (contact) => {
				if (!contact.phone) return

				// Check if the contact is unsubscribed
				const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, contact.phone)
				if (isUnsubscribed) return

				allowedContacts.push(contact)
			})
		)

		await Promise.all(
			allowedContacts.map((contact) =>
				this.messageService.send(organizationId, {
					campaignId,
					from: sender.phone,
					to: contact.phone!,
					body
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
			await this.campaignQueue.add(CampaignQueueJobName.POLL_STATUS, { organizationId, campaignId }, { delay })
	}

	private async processPollStatus(data: CampaignQueuePollStatusJobData): Promise<void> {
		// Extract data
		const { organizationId, campaignId } = data

		// Extract data
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		// Get all messages for this campaign and count their statuses
		const messages = await this.messageService.getMany(organizationId, { campaignId })
		if (messages.length === 0) return

		// Count each message status
		const statusCounts = {
			processing: 0,
			sent: 0,
			delivered: 0,
			failed: 0,
			total: messages.length
		}

		messages.forEach((message) => {
			switch (message.status) {
				case MessageStatus.PENDING: // TODO: Remove this
					statusCounts.processing++
					break
				case MessageStatus.PROCESSING:
					statusCounts.processing++
					break
				case MessageStatus.SENT:
					statusCounts.sent++
					break
				case MessageStatus.DELIVERED:
					statusCounts.delivered++
					break
				case MessageStatus.FAILED:
					statusCounts.failed++
					break
			}
		})

		if (statusCounts.processing > 0) return
		else if (statusCounts.failed === statusCounts.total) {
			campaign.setFailed()
			await this.campaignRepository.update(campaign)
		} else if (statusCounts.sent > 0 || statusCounts.delivered > 0) {
			campaign.setSent()
			await this.campaignRepository.update(campaign)
		}
	}
}

export { CAMPAIGN_QUEUE, CampaignQueueConsumer, CampaignQueueJobName, type CampaignQueueJob }

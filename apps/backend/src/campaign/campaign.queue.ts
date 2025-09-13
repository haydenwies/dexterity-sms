import { Processor, WorkerHost } from "@nestjs/bullmq"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { Job } from "bullmq"
import { ContactService } from "~/contact/contact.service"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"
import { CampaignRepository } from "./campaign.repository"

const CAMPAIGN_QUEUE = "campaign-queue"

enum CAMPAIGN_QUEUE_JOB {
	SEND = "send"
}

@Processor(CAMPAIGN_QUEUE)
class CampaignQueueConsumer extends WorkerHost {
	constructor(
		private readonly campaignRepository: CampaignRepository,
		private readonly contactService: ContactService,
		private readonly messageService: MessageService,
		private readonly senderService: SenderService
	) {
		super()
	}

	async process(job: Job) {
		switch (job.name) {
			case CAMPAIGN_QUEUE_JOB.SEND: {
				const { organizationId, campaignId } = job.data //TODO: Validate job data
				return this.processSend(organizationId, campaignId)
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

		await Promise.all(
			deduplicatedContacts.map((contact) => {
				if (!contact.phone) return

				return this.messageService.send(organizationId, {
					from: sender.phone,
					to: contact.phone,
					body,
					campaignId
				})
			})
		)
	}
}

export { CAMPAIGN_QUEUE, CAMPAIGN_QUEUE_JOB, CampaignQueueConsumer }

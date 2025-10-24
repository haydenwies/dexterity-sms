import { InjectQueue } from "@nestjs/bullmq"
import { Injectable, NotFoundException } from "@nestjs/common"
import { type Queue } from "bullmq"

import {
	type CreateCampaignDto,
	type DeleteManyCampaignsDto,
	type SendCampaignDto,
	type SendTestCampaignDto,
	type UpdateCampaignDto
} from "@dexterity-sms/core/campaign"

import { CAMPAIGN_QUEUE, CampaignQueueJobName, type CampaignQueueJob } from "~/campaign/campaign.queue"
import { Campaign } from "~/campaign/entities/campaign.entity"
import { CampaignRepository } from "~/campaign/repositories/campaign.repository"
import { Phone } from "~/common/phone.vo"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"

@Injectable()
class CampaignService {
	constructor(
		@InjectQueue(CAMPAIGN_QUEUE) private readonly campaignQueue: Queue<CampaignQueueJob>,
		private readonly campaignRepository: CampaignRepository,
		private readonly senderService: SenderService,
		private readonly messageService: MessageService
	) {}

	async get(organizationId: string, campaignId: string): Promise<Campaign> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		return campaign
	}

	async getMany(organizationId: string): Promise<Campaign[]> {
		const campaigns = await this.campaignRepository.findMany(organizationId)

		return campaigns
	}

	async create(organizationId: string, dto: CreateCampaignDto): Promise<Campaign> {
		const campaign = Campaign.create({
			organizationId,
			name: dto.name,
			body: dto.body
		})
		const createdCampaign = await this.campaignRepository.create(campaign)

		return createdCampaign
	}

	async update(organizationId: string, campaignId: string, dto: UpdateCampaignDto): Promise<Campaign> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		campaign.update({
			name: dto.name,
			body: dto.body
		})
		const updatedCampaign = await this.campaignRepository.update(campaign)

		return updatedCampaign
	}

	async delete(organizationId: string, campaignId: string): Promise<void> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		await this.campaignRepository.delete(campaign)
	}

	async deleteMany(organizationId: string, dto: DeleteManyCampaignsDto): Promise<void> {
		const campaigns = await this.campaignRepository.findMany(organizationId, dto.ids)
		if (!campaigns) throw new NotFoundException("Campaigns not found")

		await this.campaignRepository.deleteMany(campaigns)
	}

	async sendTest(organizationId: string, campaignId: string, dto: SendTestCampaignDto): Promise<void> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		const sender = await this.senderService.get(organizationId)

		const to = Phone.create(dto.to)

		const body = campaign.getBodyForSending()

		await this.messageService.send(organizationId, {
			campaignId,
			from: sender.phone,
			to,
			body
		})
	}

	async send(organizationId: string, campaignId: string, dto: SendCampaignDto): Promise<void> {
		// Get the campaign
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		// Set the campaign to scheduled
		campaign.setScheduled(dto.scheduledAt)
		await this.campaignRepository.update(campaign)

		// Add delay to the campaign if it is scheduled
		let delay = undefined
		if (campaign.scheduledAt) delay = campaign.scheduledAt.getTime() - Date.now()

		// Queue the campaign for processing
		await this.campaignQueue.add(CampaignQueueJobName.SEND, { organizationId, campaignId }, { delay })
	}

	async cancel(organizationId: string, campaignId: string): Promise<void> {
		// Get the campaign
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		// Use centralized state management - transitions SCHEDULED -> CANCELLED
		campaign.setCancelled()
		await this.campaignRepository.update(campaign)
	}
}

export { CampaignService }

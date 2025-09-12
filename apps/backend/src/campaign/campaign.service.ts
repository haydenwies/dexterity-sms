import { InjectQueue } from "@nestjs/bullmq"
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { type Queue } from "bullmq"

import { type CampaignModel } from "@repo/types/campaign"
import {
	type CreateCampaignDto,
	type DeleteManyCampaignsDto,
	type SendCampaignDto,
	type SendTestCampaignDto,
	type UpdateCampaignDto
} from "@repo/types/campaign/dto"

import { Campaign } from "~/campaign/campaign.entity"
import { CAMPAIGN_QUEUE, CAMPAIGN_QUEUE_JOB } from "~/campaign/campaign.queue"
import { CampaignRepository } from "~/campaign/campaign.repository"
import { Phone } from "~/common/phone.vo"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"

@Injectable()
class CampaignService {
	constructor(
		@InjectQueue(CAMPAIGN_QUEUE) private readonly campaignQueue: Queue,
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
		else if (!campaign.canSendTest()) throw new BadRequestException("Campaign test cannot be sent")

		const { body } = campaign.sendTest()

		const sender = await this.senderService.get(organizationId)

		const to = Phone.create(dto.to)

		await this.messageService.send({
			from: sender.phone,
			to,
			body
		})
	}

	async send(organizationId: string, campaignId: string, dto: SendCampaignDto): Promise<void> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		campaign.schedule(dto.scheduledAt)
		await this.campaignRepository.update(campaign)

		await this.campaignQueue.add(CAMPAIGN_QUEUE_JOB.SEND, {
			organizationId,
			campaignId
		})
	}

	async cancel(organizationId: string, campaignId: string): Promise<void> {
		const campaign = await this.campaignRepository.find(organizationId, campaignId)
		if (!campaign) throw new NotFoundException("Campaign not found")

		campaign.cancel()
		await this.campaignRepository.update(campaign)
	}

	toDto(campaign: Campaign): CampaignModel {
		return {
			id: campaign.id,
			organizationId: campaign.organizationId,
			status: campaign.status,
			name: campaign.name,
			body: campaign.body,
			createdAt: campaign.createdAt,
			updatedAt: campaign.updatedAt
		}
	}
}

export { CampaignService }

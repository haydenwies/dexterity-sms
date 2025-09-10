import { Injectable, NotFoundException } from "@nestjs/common"

import { type CampaignModel } from "@repo/types/campaign"
import {
	type CreateCampaignDto,
	type DeleteManyCampaignsDto,
	type SendCampaignDto,
	type SendTestCampaignDto,
	type UpdateCampaignDto
} from "@repo/types/campaign/dto"

import { Campaign } from "~/campaign/campaign.entity"
import { CampaignRepository } from "~/campaign/campaign.repository"

@Injectable()
class CampaignService {
	constructor(private readonly campaignRepository: CampaignRepository) {}

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

	async sendTest(organizationId: string, campaignId: string, dto: SendTestCampaignDto): Promise<void> {}

	async send(organizationId: string, campaignId: string, dto: SendCampaignDto): Promise<void> {}

	async cancel(organizationId: string, campaignId: string): Promise<void> {}

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

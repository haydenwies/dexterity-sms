import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"

import {
	createCampaignDtoSchema,
	deleteManyCampaignsDtoSchema,
	sendCampaignDtoSchema,
	sendTestCampaignDtoSchema,
	updateCampaignDtoSchema,
	type CampaignModel,
	type CreateCampaignDto,
	type DeleteManyCampaignsDto,
	type SendCampaignDto,
	type SendTestCampaignDto,
	type UpdateCampaignDto
} from "@dexterity-sms/core/campaign"

import { AuthGuard } from "~/auth/auth.guard"
import { SubscriptionGuard } from "~/billing/guards/subscription.guard"
import { CampaignService } from "~/campaign/campaign.service"
import { toCampaignDto } from "~/campaign/campaign.utils"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { MemberGuard } from "~/organization/guards/member.guard"
import { SenderGuard } from "~/sender/guards/sender.guard"

@UseGuards(AuthGuard, MemberGuard)
@Controller("organizations/:organizationId/campaigns")
class CampaignController {
	constructor(private readonly campaignService: CampaignService) {}

	@Get()
	async getMany(@Param("organizationId") organizationId: string): Promise<CampaignModel[]> {
		const campaigns = await this.campaignService.getMany(organizationId)

		return campaigns.map((campaign) => toCampaignDto(campaign))
	}

	@Post()
	async create(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createCampaignDtoSchema)) body: CreateCampaignDto
	): Promise<CampaignModel> {
		const campaign = await this.campaignService.create(organizationId, body)

		return toCampaignDto(campaign)
	}

	@Delete()
	async deleteMany(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(deleteManyCampaignsDtoSchema)) body: DeleteManyCampaignsDto
	): Promise<void> {
		await this.campaignService.deleteMany(organizationId, body)
	}

	@Get(":campaignId")
	async get(
		@Param("organizationId") organizationId: string,
		@Param("campaignId") campaignId: string
	): Promise<CampaignModel> {
		const campaign = await this.campaignService.get(organizationId, campaignId)

		return toCampaignDto(campaign)
	}

	@Put(":campaignId")
	async update(
		@Param("organizationId") organizationId: string,
		@Param("campaignId") campaignId: string,
		@Body(new ZodValidationPipe(updateCampaignDtoSchema)) body: UpdateCampaignDto
	): Promise<CampaignModel> {
		const campaign = await this.campaignService.update(organizationId, campaignId, body)

		return toCampaignDto(campaign)
	}

	@Delete(":campaignId")
	async delete(
		@Param("organizationId") organizationId: string,
		@Param("campaignId") campaignId: string
	): Promise<void> {
		await this.campaignService.delete(organizationId, campaignId)
	}

	@UseGuards(SubscriptionGuard, SenderGuard)
	@Post(":campaignId/send-test")
	async sendTest(
		@Param("organizationId") organizationId: string,
		@Param("campaignId") campaignId: string,
		@Body(new ZodValidationPipe(sendTestCampaignDtoSchema)) body: SendTestCampaignDto
	): Promise<void> {
		await this.campaignService.sendTest(organizationId, campaignId, body)
	}

	@UseGuards(SubscriptionGuard, SenderGuard)
	@Post(":campaignId/send")
	async send(
		@Param("organizationId") organizationId: string,
		@Param("campaignId") campaignId: string,
		@Body(new ZodValidationPipe(sendCampaignDtoSchema)) body: SendCampaignDto
	): Promise<void> {
		await this.campaignService.send(organizationId, campaignId, body)
	}

	@Post(":campaignId/cancel")
	async cancel(
		@Param("organizationId") organizationId: string,
		@Param("campaignId") campaignId: string
	): Promise<void> {
		await this.campaignService.cancel(organizationId, campaignId)
	}
}

export { CampaignController }

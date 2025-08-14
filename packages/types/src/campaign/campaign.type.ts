import { CampaignStatus } from "./campaign.enum"

type CampaignModel = {
	id: string
	organizationId: String
	templateId: string
	status: CampaignStatus
	name: string
	createdAt: Date
	updatedAt: Date
}

type CampaignTemplateModel = {
	id: string
	name?: string
	description?: string
	createdAt: Date
	updatedAt: Date
}

export type { CampaignModel, CampaignTemplateModel }

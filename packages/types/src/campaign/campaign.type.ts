import { CampaignStatus } from "./campaign.enum"

type CampaignModel = {
	id: string
	organizationId: String
	status: CampaignStatus
	name: string
	body?: string
	createdAt: Date
	updatedAt: Date
}

export type { CampaignModel }

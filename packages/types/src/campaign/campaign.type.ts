import { CampaignStatus } from "./campaign.enum"

type CampaignModel = {
	id: string
	organizationId: string
	status: CampaignStatus
	name: string
	body?: string
	createdAt: Date
	updatedAt: Date
}

export type { CampaignModel }

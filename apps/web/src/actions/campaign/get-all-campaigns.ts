"use server"

import { CampaignModel } from "@repo/types/campaign"
import { CampaignStatus } from "@repo/types/campaign/enums"

const getAllCampaigns = async (): Promise<CampaignModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			templateId: "1",
			status: CampaignStatus.DRAFT,
			name: "Spring Launch",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "2",
			organizationId: "1",
			templateId: "1",
			status: CampaignStatus.CANCELLED,
			name: "Summer Sale",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "3",
			organizationId: "1",
			templateId: "1",
			status: CampaignStatus.DELIVERED,
			name: "Winter Clearance",
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllCampaigns }

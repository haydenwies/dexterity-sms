"use server"

import { CampaignModel } from "@repo/types/campaign"
import { CampaignStatus } from "@repo/types/campaign/enums"

const getAllCampaigns = async (): Promise<CampaignModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			status: CampaignStatus.DRAFT,
			name: "Spring Launch",
			body: "This is a test body",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "2",
			organizationId: "1",
			status: CampaignStatus.CANCELLED,
			name: "Summer Sale",
			body: "This is a test body",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "3",
			organizationId: "1",
			status: CampaignStatus.DELIVERED,
			name: "Winter Clearance",
			body: "This is a test body",
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllCampaigns }

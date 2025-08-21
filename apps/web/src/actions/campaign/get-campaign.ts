"use server"

import { CampaignModel } from "@repo/types/campaign"
import { CampaignStatus } from "@repo/types/campaign/enums"

const getCampaign = async (campaignId: string): Promise<CampaignModel> => {
	return {
		id: "1",
		organizationId: "1",
		status: CampaignStatus.DRAFT,
		name: "Test Campaign",
		body: "This is a test campaign",
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

export { getCampaign }

import { CampaignModel } from "@dexterity-sms/core/campaign"

import { Campaign } from "~/campaign/entities/campaign.entity"

const toCampaignDto = (campaign: Campaign): CampaignModel => {
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

export { toCampaignDto }

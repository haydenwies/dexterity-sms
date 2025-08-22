"use server"

import { UpdateCampaignDto } from "@repo/types/campaign/dto/update-campaign"

import { ActionResponse, actionSuccess } from "~/lib/actions"

const updateCampaign = async (campaignId: string, dto: UpdateCampaignDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { updateCampaign }

"use server"

import { type SendCampaignDto } from "@repo/types/campaign/dto/send-campaign"

import { type ActionResponse, actionSuccess } from "~/actions/actions"

const sendCampaign = async (dto: SendCampaignDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { sendCampaign }

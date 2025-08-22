"use server"

import { SendTestCampaignDto } from "@repo/types/campaign/dto/send-test-campaign"

import { ActionResponse, actionSuccess } from "~/lib/actions"

const sendTestCampaign = async (dto: SendTestCampaignDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { sendTestCampaign }

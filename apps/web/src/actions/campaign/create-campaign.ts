"use server"

import { type CreateCampaignDto } from "@repo/types/campaign/dto/create-campaign"

import { ActionResponse, actionSuccess } from "~/lib/actions"

const createCampaign = async (dto: CreateCampaignDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { createCampaign }

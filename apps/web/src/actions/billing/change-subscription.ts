"use server"

import { type ChangeSubscriptionDto } from "@repo/types/billing/dto/change-subscription"

import { actionSuccess, type ActionResponse } from "~/lib/actions"

const changeSubscription = async (dto: ChangeSubscriptionDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { changeSubscription }

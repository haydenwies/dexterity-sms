"use server"

import { type ChangeSubscriptionDto } from "@repo/types/billing/dto/change-subscription"

const changeSubscription = async (dto: ChangeSubscriptionDto): Promise<undefined> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)
}

export { changeSubscription }

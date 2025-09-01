"use server"

import { type SubscriptionModel } from "@repo/types/billing"

const getAllSubscriptions = async (): Promise<SubscriptionModel[]> => {
	return [
		{
			id: "1",
			name: "Pay-as-You-Go",
			description: "Only pay for what you use",
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllSubscriptions }

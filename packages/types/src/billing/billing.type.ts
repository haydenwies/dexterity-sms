type BillingAccountModel = {
	id: string
	subscriptionId?: string
	createdAt: Date
	updatedAt: Date
}

type SubscriptionModel = {
	id: string
	name: string
	description: string
	createdAt: Date
	updatedAt: Date
}

export type { BillingAccountModel, SubscriptionModel }

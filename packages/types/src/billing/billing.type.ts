import { SubscriptionStatus } from "./billing.enum"

type BillingAccountModel = {
	id: string
	subscriptionId?: string
	createdAt: Date
	updatedAt: Date
}

type SubscriptionModel = {
	organizationId: string
	status: SubscriptionStatus
	cancelAtPeriodEnd: boolean
	createdAt: Date
	updatedAt: Date
}

export type { BillingAccountModel, SubscriptionModel }

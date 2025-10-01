import { SubscriptionStatus } from "./billing.enum"

type SubscriptionModel = {
	organizationId: string
	status: SubscriptionStatus
	cancelAtPeriodEnd: boolean
	createdAt: Date
	updatedAt: Date
}

export type { SubscriptionModel }

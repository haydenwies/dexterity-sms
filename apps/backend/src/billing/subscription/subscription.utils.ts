import { SubscriptionModel } from "@repo/types/billing"

import { Subscription } from "~/billing/subscription/subscription.entity"

const toSubscriptionDto = (subscription: Subscription): SubscriptionModel => {
	return {
		organizationId: subscription.organizationId,
		status: subscription.status,
		cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
		createdAt: subscription.createdAt,
		updatedAt: subscription.updatedAt
	}
}

export { toSubscriptionDto }

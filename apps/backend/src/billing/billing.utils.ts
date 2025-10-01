import { type Stripe } from "stripe"

import { type BillingPortalSessionDto, type CheckoutSessionDto, type SubscriptionModel } from "@repo/types/billing"

import { type Subscription } from "~/billing/entities/subscription.entity"

const toSubscriptionDto = (subscription: Subscription): SubscriptionModel => {
	return {
		organizationId: subscription.organizationId,
		status: subscription.status,
		cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
		createdAt: subscription.createdAt,
		updatedAt: subscription.updatedAt
	}
}

const toBillingPortalSessionDto = (billingPortalSession: Stripe.BillingPortal.Session): BillingPortalSessionDto => {
	if (!billingPortalSession.url) throw new Error("Billing portal session URL is required")

	return {
		url: billingPortalSession.url
	}
}

const toCheckoutSessionDto = (checkoutSession: Stripe.Checkout.Session): CheckoutSessionDto => {
	if (!checkoutSession.url) throw new Error("Checkout session URL is required")

	return {
		url: checkoutSession.url
	}
}

export { toBillingPortalSessionDto, toCheckoutSessionDto, toSubscriptionDto }

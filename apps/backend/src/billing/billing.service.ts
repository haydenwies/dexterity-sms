import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common"

import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"
import { Subscription } from "~/billing/subscription/subscription.entity"
import { SubscriptionService } from "~/billing/subscription/subscription.service"
import { OrganizationService } from "~/organization/organization.service"

@Injectable()
class BillingService {
	constructor(
		@Inject(BILLING_PROVIDER) private readonly billingProvider: BillingProvider,
		private readonly organizationService: OrganizationService,
		private readonly subscriptionService: SubscriptionService
	) {}

	async getCheckoutSession(organizationId: string, callbackUrl: string): Promise<{ url: string }> {
		const organization = await this.organizationService.getById(organizationId)

		let billingAccountId = organization.externalBillingAccountId
		if (!billingAccountId) {
			// TODO: Add email
			const customer = await this.billingProvider.customers.create({
				metadata: {
					organizationId: organization.id
				}
			})

			await this.organizationService.updateExternalBillingAccountId(organizationId, customer.id)
			billingAccountId = customer.id
		}

		const checkoutSession = await this.billingProvider.checkout.sessions.create({
			customer: billingAccountId,
			mode: "subscription",
			success_url: callbackUrl,
			cancel_url: callbackUrl
			// TODO: Add line items
		})

		const url = checkoutSession.url
		if (!url) throw new InternalServerErrorException("Failed to create checkout session")

		return { url }
	}

	async getBillingPortalSession(organizationId: string, callbackUrl: string): Promise<{ url: string }> {
		const organization = await this.organizationService.getById(organizationId)

		let billingAccountId = organization.externalBillingAccountId
		if (!billingAccountId) {
			// TODO: Add email
			const customer = await this.billingProvider.customers.create({
				metadata: {
					organizationId: organization.id
				}
			})

			await this.organizationService.updateExternalBillingAccountId(organizationId, customer.id)
			billingAccountId = customer.id
		}

		const billingPortalSession = await this.billingProvider.billingPortal.sessions.create({
			customer: billingAccountId,
			return_url: callbackUrl
		})

		const url = billingPortalSession.url
		if (!url) throw new InternalServerErrorException("Failed to create billing portal session")

		return { url }
	}

	async getSubscription(organizationId: string): Promise<Subscription> {
		const subscription = await this.subscriptionService.get(organizationId)

		return subscription
	}
}

export { BillingService }

import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"

import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"
import {
	Subscription,
	SubscriptionCreateParams,
	SubscriptionUpdateParams
} from "~/billing/entities/subscription.entity"
import { OrganizationService } from "~/organization/organization.service"
import { SubscriptionRepository } from "./repositories/subscription.repository"

@Injectable()
class BillingService {
	public readonly SENDER_EXTERNAL_ID = "price_1SAsfeRfl3ViJIjUho0R5Y0g"
	public readonly SMS_CREDIT_EXTERNAL_ID = "price_1SAsdGRfl3ViJIjUkVPpxU8h"
	public readonly SMS_CREDIT_METER_ID = "sms_credit"

	constructor(
		@Inject(BILLING_PROVIDER) private readonly billingProvider: BillingProvider,
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly organizationService: OrganizationService
	) {}

	async getBillingAccountId(organizationId: string): Promise<string> {
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

		return billingAccountId
	}

	async getCheckoutSession(organizationId: string, callbackUrl: string): Promise<{ url: string }> {
		const billingAccountId = await this.getBillingAccountId(organizationId)

		const checkoutSession = await this.billingProvider.checkout.sessions.create({
			customer: billingAccountId,
			mode: "subscription",
			success_url: callbackUrl,
			cancel_url: callbackUrl,
			line_items: [{ price: this.SMS_CREDIT_EXTERNAL_ID }]
		})

		const url = checkoutSession.url
		if (!url) throw new InternalServerErrorException("Failed to create checkout session")

		return { url }
	}

	async getBillingPortalSession(organizationId: string, callbackUrl: string): Promise<{ url: string }> {
		const billingAccountId = await this.getBillingAccountId(organizationId)

		const billingPortalSession = await this.billingProvider.billingPortal.sessions.create({
			customer: billingAccountId,
			return_url: callbackUrl
		})

		const url = billingPortalSession.url
		if (!url) throw new InternalServerErrorException("Failed to create billing portal session")

		return { url }
	}

	async getSubscription(organizationId: string): Promise<Subscription> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) throw new NotFoundException("Subscription not found")

		return subscription
	}

	async safeGetSubscription(organizationId: string): Promise<Subscription | undefined> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) return undefined

		return subscription
	}

	async createSubscription(organizationId: string, params: SubscriptionCreateParams): Promise<Subscription> {
		const existingSubscription = await this.subscriptionRepository.find(organizationId)
		if (existingSubscription) throw new ConflictException("Subscription already exists")

		const subscription = Subscription.create(params)
		const createdSubscription = await this.subscriptionRepository.create(subscription)

		return createdSubscription
	}

	async updateSubscription(organizationId: string, params: SubscriptionUpdateParams): Promise<Subscription> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) throw new NotFoundException("Subscription not found")

		subscription.update(params)
		const updatedSubscription = await this.subscriptionRepository.update(subscription)

		return updatedSubscription
	}

	async deleteSubscription(organizationId: string): Promise<void> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) return

		await this.subscriptionRepository.delete(subscription)
	}
}

export { BillingService }

import {
	ConflictException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	type RawBodyRequest
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type Request } from "express"

import { SubscriptionStatus } from "@repo/types/billing"

import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"
import {
	Subscription,
	SubscriptionCreateParams,
	SubscriptionUpdateParams
} from "~/billing/entities/subscription.entity"
import { SubscriptionRepository } from "~/billing/repositories/subscription.repository"
import { OrganizationService } from "~/organization/organization.service"

// #region BillingService

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

// #endregion

// #region BillingWebhookService

@Injectable()
class BillingWebhookService {
	private readonly logger = new Logger(BillingWebhookService.name)

	constructor(
		@Inject(BILLING_PROVIDER) private readonly billingProvider: BillingProvider,
		private readonly billingService: BillingService,
		private readonly configService: ConfigService,
		private readonly organizationService: OrganizationService
	) {}

	async handleWebhookEvent(req: RawBodyRequest<Request>): Promise<void> {
		const payload = req.rawBody
		if (!payload) throw new Error("No payload provided")

		const signature = req.headers["stripe-signature"]
		if (!signature) return

		const webhookSecret = this.configService.getOrThrow<string>("billing.stripeWebhookSecret")

		let event: ReturnType<BillingProvider["webhooks"]["constructEvent"]>
		try {
			event = this.billingProvider.webhooks.constructEvent(payload, signature, webhookSecret)
		} catch (err: unknown) {
			this.logger.warn("Failed to construct webhook event with error", err)
			return
		}

		const { customer: externalBillingAccountId } = event?.data?.object as { customer?: string }
		if (!externalBillingAccountId) {
			this.logger.warn("No external billing account ID found in webhook event")
			return
		}

		const organization = await this.organizationService.getByExternalBillingAccountId(externalBillingAccountId)
		if (!organization.externalBillingAccountId) {
			this.logger.warn(`No organization found with external billing account ID ${externalBillingAccountId}`)
			return
		}

		const subscriptions = await this.billingProvider.subscriptions.list({
			customer: organization.externalBillingAccountId,
			limit: 1,
			status: "all"
		})

		const subscription = subscriptions.data[0]
		if (!subscription) {
			await this.billingService.deleteSubscription(organization.id)
			this.logger.warn(`No subscription found in provider for organization ${organization.id}`)
			return
		}

		if (subscription.status === "active" || subscription.status === "trialing") {
			// Create active subscription or update existing
			const existingSubscription = await this.billingService.safeGetSubscription(organization.id)
			if (!existingSubscription)
				await this.billingService.createSubscription(organization.id, {
					organizationId: organization.id,
					externalId: subscription.id,
					status: SubscriptionStatus.ACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
			else
				await this.billingService.updateSubscription(existingSubscription.organizationId, {
					status: SubscriptionStatus.ACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
		} else if (subscription.status === "canceled")
			// Update subscription to cancelled if exists
			await this.billingService.updateSubscription(organization.id, {
				status: SubscriptionStatus.CANCELLED,
				cancelAtPeriodEnd: subscription.cancel_at_period_end
			})
		else if (subscription.status === "past_due")
			// Update subscription to past due if exists
			await this.billingService.updateSubscription(organization.id, {
				status: SubscriptionStatus.PAST_DUE,
				cancelAtPeriodEnd: subscription.cancel_at_period_end
			})
		else {
			// Create inactive subscription or update existing
			const existingSubscription = await this.billingService.safeGetSubscription(organization.id)
			if (!existingSubscription)
				await this.billingService.createSubscription(organization.id, {
					organizationId: organization.id,
					externalId: subscription.id,
					status: SubscriptionStatus.INACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
			else
				await this.billingService.updateSubscription(organization.id, {
					status: SubscriptionStatus.INACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
		}
	}
}

// #endregion

export { BillingService, BillingWebhookService }

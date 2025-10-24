import { ConflictException, Injectable, Logger, NotFoundException, type RawBodyRequest } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type Request } from "express"
import { Stripe } from "stripe"

import {
	CreateBillingPortalSessionDto,
	type CreateCheckoutSessionDto,
	SubscriptionStatus
} from "@dexterity-sms/core/billing"

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
	private readonly logger = new Logger(BillingService.name)
	private readonly stripe: Stripe

	public readonly SENDER_PRICE_ID: string
	public readonly SENDER_REMOVAL_PRICE_ID: string
	public readonly SMS_CREDIT_PRICE_ID: string
	public readonly SMS_CREDIT_METER_ID: string

	constructor(
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly configService: ConfigService,
		private readonly organizationService: OrganizationService
	) {
		this.stripe = new Stripe(this.configService.getOrThrow<string>("billing.stripeApiKey"))

		this.SENDER_PRICE_ID = this.configService.getOrThrow<string>("billing.stripeSenderPriceId")
		this.SENDER_REMOVAL_PRICE_ID = this.configService.getOrThrow<string>("billing.stripeSenderRemovalPriceId")
		this.SMS_CREDIT_PRICE_ID = this.configService.getOrThrow<string>("billing.stripeSmsCreditPriceId")
		this.SMS_CREDIT_METER_ID = this.configService.getOrThrow<string>("billing.stripeSmsCreditMeterId")
	}

	private async getStripeCustomerId(organizationId: string): Promise<string> {
		const organization = await this.organizationService.getById(organizationId)

		let billingAccountId = organization.externalBillingId
		if (!billingAccountId) {
			this.logger.warn(`No billing account found for organization ${organizationId}, creating one`)

			const customer = await this.stripe.customers.create({
				name: organization.name,
				email: organization.email,
				metadata: {
					organizationId: organization.id
				}
			})

			await this.organizationService.updateExternalBillingId(organizationId, customer.id)
			billingAccountId = customer.id
		}

		return billingAccountId
	}

	async createBillingPortalSession(
		organizationId: string,
		dto: CreateBillingPortalSessionDto
	): Promise<Stripe.BillingPortal.Session> {
		const billingAccountId = await this.getStripeCustomerId(organizationId)

		const billingPortalSession = await this.stripe.billingPortal.sessions.create({
			customer: billingAccountId,
			return_url: dto.callbackUrl
		})

		return billingPortalSession
	}

	async createCheckoutSession(
		organizationId: string,
		dto: CreateCheckoutSessionDto
	): Promise<Stripe.Checkout.Session> {
		const billingAccountId = await this.getStripeCustomerId(organizationId)

		const checkoutSession = await this.stripe.checkout.sessions.create({
			customer: billingAccountId,
			mode: "subscription",
			success_url: dto.callbackUrl,
			cancel_url: dto.callbackUrl,
			line_items: [{ price: this.SMS_CREDIT_PRICE_ID }]
		})

		return checkoutSession
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
	private readonly stripe: Stripe

	constructor(
		private readonly billingService: BillingService,
		private readonly configService: ConfigService,
		private readonly organizationService: OrganizationService
	) {
		this.stripe = new Stripe(this.configService.getOrThrow<string>("billing.stripeApiKey"))
	}

	async handleWebhookEvent(req: RawBodyRequest<Request>): Promise<void> {
		const payload = req.rawBody
		if (!payload) throw new Error("No payload provided")

		const signature = req.headers["stripe-signature"]
		if (!signature) return

		const webhookSecret = this.configService.getOrThrow<string>("billing.stripeWebhookSecret")

		let event: Stripe.Event
		try {
			event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret)
		} catch (err: unknown) {
			this.logger.warn("Failed to construct webhook event with error", err)
			return
		}

		const { customer: externalBillingId } = event?.data?.object as { customer?: string }
		if (!externalBillingId) {
			this.logger.warn("No external billing ID found in webhook event")
			return
		}

		const organization = await this.organizationService.getByExternalBillingId(externalBillingId)
		if (!organization.externalBillingId) {
			this.logger.warn(`No organization found with external billing account ID ${externalBillingId}`)
			return
		}

		const subscriptions = await this.stripe.subscriptions.list({
			customer: organization.externalBillingId,
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

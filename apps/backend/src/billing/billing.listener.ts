import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { OnEvent } from "@nestjs/event-emitter"
import { Stripe } from "stripe"

import { BillingService } from "~/billing/billing.service"
import {
	Event,
	type MessageCreatedEvent,
	type OrganizationCreatedEvent,
	type OrganizationUpdatedEvent,
	type SenderAddedEvent,
	type SenderRemovedEvent
} from "~/common/event.types"
import { OrganizationService } from "~/organization/organization.service"

@Injectable()
class BillingListener {
	private readonly logger = new Logger(BillingListener.name)
	private readonly stripe: Stripe

	constructor(
		private readonly configService: ConfigService,
		private readonly billingService: BillingService,
		private readonly organizationService: OrganizationService
	) {
		this.stripe = new Stripe(this.configService.getOrThrow<string>("billing.stripeApiKey"))
	}

	@OnEvent(Event.ORGANIZATION_CREATED)
	async handleOrganizationCreated(event: OrganizationCreatedEvent): Promise<void> {
		try {
			// Get Stripe customer ID
			const customerId = event.externalBillingId
			if (customerId) return

			// Create Stripe customer
			const customer = await this.stripe.customers.create({
				name: event.name,
				email: event.email,
				metadata: {
					organizationId: event.id
				}
			})

			// Update organization with Stripe customer ID
			await this.organizationService.updateExternalBillingId(event.id, customer.id)

			this.logger.log(`Billing account created for organization ${event.id}`)
		} catch (err: unknown) {
			this.logger.error(`Failed to create billing account for organization ${event.id}`, err)
		}
	}

	@OnEvent(Event.ORGANIZATION_UPDATED)
	async handleOrganizationUpdated(event: OrganizationUpdatedEvent): Promise<void> {
		try {
			// Get Stripe customer ID
			const customerId = event.externalBillingId
			if (!customerId) {
				// Skip if no customer ID is found
				this.logger.warn(`No billing account found for organization ${event.id}`)
				return
			}

			// Sync Stripe customer name and email
			await this.stripe.customers.update(customerId, {
				name: event.name,
				email: event.email
			})

			this.logger.log(`Billing account updated for organization ${event.id}`)
		} catch (err: unknown) {
			this.logger.error(`Failed to update billing account for organization ${event.id}`, err)
		}
	}

	@OnEvent(Event.MESSAGE_CREATED)
	async handleMessageCreated(event: MessageCreatedEvent): Promise<void> {
		try {
			// Get organization to find billing account
			const organization = await this.organizationService.getById(event.organizationId)
			if (!organization.externalBillingId) {
				this.logger.warn(
					`No billing account found for organization ${event.organizationId}, skipping SMS credit billing`
				)
				return
			}

			// Get subscription to ensure organization has active billing
			const subscription = await this.billingService.safeGetSubscription(event.organizationId)
			if (!subscription) {
				this.logger.warn(
					`No subscription found for organization ${event.organizationId}, skipping SMS credit billing`
				)
				return
			}

			// Report SMS credit usage to Stripe (metered billing)
			// Calculate SMS credits based on message body length (100 chars = 1 credit, rounded up)
			await this.stripe.billing.meterEvents.create({
				event_name: this.billingService.SMS_CREDIT_METER_ID,
				payload: {
					stripe_customer_id: organization.externalBillingId,
					value: Math.ceil(event.body.length / 100).toString()
				}
			})

			this.logger.log(
				`SMS credit usage reported for organization ${event.organizationId}, message ${event.messageId}`
			)
		} catch (err: unknown) {
			// Never block operations - just log and fail gracefully
			this.logger.error(`Failed to report SMS credit usage for organization ${event.organizationId}`, err)
		}
	}

	@OnEvent(Event.SENDER_ADDED)
	async handleSenderAdded(event: SenderAddedEvent): Promise<void> {
		try {
			// Get subscription to ensure organization has active billing
			const subscription = await this.billingService.safeGetSubscription(event.organizationId)
			if (!subscription) {
				this.logger.warn(
					`No subscription found for organization ${event.organizationId}, skipping sender billing`
				)
				return
			}

			// Get current subscription items
			const subscriptionItems = await this.stripe.subscriptionItems.list({
				subscription: subscription.externalId
			})

			// Find the sender subscription item
			const senderItem = subscriptionItems.data.find(
				(item) => item.price.id === this.billingService.SENDER_PRICE_ID
			)

			if (senderItem)
				// Update existing sender item quantity (immediate effect, no proration)
				await this.stripe.subscriptionItems.update(senderItem.id, {
					quantity: (senderItem.quantity || 0) + 1,
					proration_behavior: "none"
				})
			else
				// Create new sender subscription item
				await this.stripe.subscriptionItems.create({
					subscription: subscription.externalId,
					price: this.billingService.SENDER_PRICE_ID,
					quantity: 1,
					proration_behavior: "none"
				})

			this.logger.log(
				`Sender added to subscription for organization ${event.organizationId}, phone ${event.phone}`
			)
		} catch (err: unknown) {
			// Never block operations - just log and fail gracefully
			this.logger.error(`Failed to add sender to subscription for organization ${event.organizationId}`, err)
		}
	}

	@OnEvent(Event.SENDER_REMOVED)
	async handleSenderRemoved(event: SenderRemovedEvent): Promise<void> {
		try {
			// Get subscription to ensure organization has active billing
			const subscription = await this.billingService.safeGetSubscription(event.organizationId)
			if (!subscription) {
				this.logger.warn(
					`No subscription found for organization ${event.organizationId}, skipping sender removal billing`
				)
				return
			}

			// Get current subscription items
			const subscriptionItems = await this.stripe.subscriptionItems.list({
				subscription: subscription.externalId
			})

			// Find the sender subscription item
			const senderItem = subscriptionItems.data.find(
				(item) => item.price.id === this.billingService.SENDER_PRICE_ID
			)
			if (!senderItem) return

			if (senderItem.quantity && senderItem.quantity > 1)
				// Decrease quantity (takes effect next billing period)
				await this.stripe.subscriptionItems.update(senderItem.id, {
					quantity: senderItem.quantity - 1,
					proration_behavior: "none" // No proration - takes effect next period
				})
			else
				// Remove the subscription item entirely
				await this.stripe.subscriptionItems.del(senderItem.id, {
					proration_behavior: "none"
				})

			// Invoice the customer for the removed sender
			const organization = await this.organizationService.getById(event.organizationId)
			if (!organization.externalBillingId) {
				this.logger.warn(`No billing account for organization ${event.organizationId}`)
				return
			}

			await this.stripe.invoiceItems.create({
				customer: organization.externalBillingId,
				subscription: subscription.externalId,
				pricing: {
					price: this.billingService.SENDER_REMOVAL_PRICE_ID
				},
				description: `Removed sender (${event.phone})`
			})

			this.logger.log(
				`Sender removed from subscription for organization ${event.organizationId}, phone ${event.phone}`
			)
		} catch (err: unknown) {
			// Never block operations - just log and fail gracefully
			this.logger.error(`Failed to remove sender from subscription for organization ${event.organizationId}`, err)
		}
	}
}

export { BillingListener }

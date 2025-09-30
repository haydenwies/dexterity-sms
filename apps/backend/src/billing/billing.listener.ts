import { Inject, Injectable, Logger } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"

import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"
import {
	EVENT_TOPIC,
	type MessageCreatedEvent,
	type SenderAddedEvent,
	type SenderRemovedEvent
} from "~/event/event.types"
import { OrganizationService } from "~/organization/organization.service"
import { BillingService } from "./billing.service"

@Injectable()
class BillingListener {
	private readonly logger = new Logger(BillingListener.name)

	constructor(
		@Inject(BILLING_PROVIDER) private readonly billingProvider: BillingProvider,
		private readonly billingService: BillingService,
		private readonly organizationService: OrganizationService
	) {}

	@OnEvent(EVENT_TOPIC.MESSAGE_CREATED)
	async handleMessageCreated(event: MessageCreatedEvent): Promise<void> {
		try {
			// Get organization to find billing account
			const organization = await this.organizationService.getById(event.organizationId)
			if (!organization.externalBillingAccountId) {
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
			await this.billingProvider.billing.meterEvents.create({
				event_name: this.billingService.SMS_CREDIT_METER_ID,
				payload: {
					stripe_customer_id: organization.externalBillingAccountId,
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

	@OnEvent(EVENT_TOPIC.SENDER_ADDED)
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
			const subscriptionItems = await this.billingProvider.subscriptionItems.list({
				subscription: subscription.externalId
			})

			// Find the sender subscription item
			const senderItem = subscriptionItems.data.find(
				(item) => item.price.id === this.billingService.SENDER_EXTERNAL_ID
			)

			if (senderItem)
				// Update existing sender item quantity (immediate effect, no proration)
				await this.billingProvider.subscriptionItems.update(senderItem.id, {
					quantity: (senderItem.quantity || 0) + 1,
					proration_behavior: "none" // No proration - takes effect immediately
				})
			else
				// Create new sender subscription item
				await this.billingProvider.subscriptionItems.create({
					subscription: subscription.externalId,
					price: this.billingService.SENDER_EXTERNAL_ID,
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

	@OnEvent(EVENT_TOPIC.SENDER_REMOVED)
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
			const subscriptionItems = await this.billingProvider.subscriptionItems.list({
				subscription: subscription.externalId
			})

			// Find the sender subscription item
			const senderItem = subscriptionItems.data.find(
				(item) => item.price.id === this.billingService.SENDER_EXTERNAL_ID
			)
			if (!senderItem) return

			if (senderItem.quantity && senderItem.quantity > 1)
				// Decrease quantity (takes effect next billing period)
				await this.billingProvider.subscriptionItems.update(senderItem.id, {
					quantity: senderItem.quantity - 1,
					proration_behavior: "none" // No proration - takes effect next period
				})
			else
				// Remove the subscription item entirely
				await this.billingProvider.subscriptionItems.del(senderItem.id, {
					proration_behavior: "none"
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

import { Inject, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type Request } from "express"

import { SubscriptionStatus } from "@repo/types/billing"

import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"
import { SubscriptionService } from "~/billing/subscription/subscription.service"
import { OrganizationService } from "~/organization/organization.service"

@Injectable()
class BillingWebhookService {
	constructor(
		@Inject(BILLING_PROVIDER) private readonly billingProvider: BillingProvider,
		private readonly configService: ConfigService,
		private readonly organizationService: OrganizationService,
		private readonly subscriptionService: SubscriptionService
	) {}

	async handleEvent(req: Request): Promise<void> {
		const webhookSecret = this.configService.getOrThrow<string>("billing.stripeWebhookSecret")
		const signature = req.headers["stripe-signature"]
		if (!signature) return

		let event: ReturnType<BillingProvider["webhooks"]["constructEvent"]>
		try {
			event = this.billingProvider.webhooks.constructEvent(req.body, signature, webhookSecret)
		} catch {
			return
		}

		const { customer: externalBillingAccountId } = event?.data?.object as { customer?: string }
		if (!externalBillingAccountId) return

		const organization = await this.organizationService.getByExternalBillingAccountId(externalBillingAccountId)
		if (!organization.externalBillingAccountId) return

		const subscriptions = await this.billingProvider.subscriptions.list({
			customer: organization.externalBillingAccountId,
			limit: 1,
			status: "all"
		})

		const subscription = subscriptions.data[0]
		if (!subscription) {
			await this.subscriptionService.delete(organization.id)
			return
		}

		if (subscription.status === "active" || subscription.status === "trialing") {
			// Create active subscription or update existing
			const existingSubscription = await this.subscriptionService.safeGet(organization.id)
			if (!existingSubscription)
				await this.subscriptionService.create(organization.id, {
					organizationId: organization.id,
					externalId: subscription.id,
					status: SubscriptionStatus.ACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
			else
				await this.subscriptionService.update(existingSubscription.organizationId, {
					status: SubscriptionStatus.ACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
		} else if (subscription.status === "canceled")
			// Update subscription to cancelled if exists
			await this.subscriptionService.update(organization.id, {
				status: SubscriptionStatus.CANCELLED,
				cancelAtPeriodEnd: subscription.cancel_at_period_end
			})
		else if (subscription.status === "past_due")
			// Update subscription to past due if exists
			await this.subscriptionService.update(organization.id, {
				status: SubscriptionStatus.PAST_DUE,
				cancelAtPeriodEnd: subscription.cancel_at_period_end
			})
		else {
			// Create inactive subscription or update existing
			const existingSubscription = await this.subscriptionService.safeGet(organization.id)
			if (!existingSubscription)
				await this.subscriptionService.create(organization.id, {
					organizationId: organization.id,
					externalId: subscription.id,
					status: SubscriptionStatus.INACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
			else
				await this.subscriptionService.update(organization.id, {
					status: SubscriptionStatus.INACTIVE,
					cancelAtPeriodEnd: subscription.cancel_at_period_end
				})
		}
	}
}

export { BillingWebhookService }

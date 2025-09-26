import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type Request } from "express"

import { SubscriptionStatus } from "@repo/types/billing"

import { AuthRequest } from "~/auth/auth.guard"
import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"
import { SubscriptionService } from "~/billing/subscription/subscription.service"

@Injectable()
class SubscriptionGuard implements CanActivate {
	private readonly logger = new Logger(SubscriptionGuard.name)

	constructor(private readonly subscriptionService: SubscriptionService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		const organizationId = request.params?.organizationId
		if (!organizationId) {
			this.logger.warn("No organizationId found in request params")
			return false
		}

		try {
			// Get subscription
			const subscription = await this.subscriptionService.safeGet(organizationId)
			if (!subscription) {
				this.logger.warn(`No subscription found for organization ${organizationId}`)
				throw new ForbiddenException("Active subscription required")
			}

			// Check if subscription is in a valid state for usage
			const validStatuses = [SubscriptionStatus.ACTIVE, SubscriptionStatus.PAST_DUE]
			if (!validStatuses.includes(subscription.status)) {
				this.logger.warn(
					`Invalid subscription status '${subscription.status}' for organization ${organizationId}`
				)
				throw new ForbiddenException("Active subscription required")
			}

			return true
		} catch (error) {
			if (error instanceof ForbiddenException) throw error

			// For any other errors (e.g., database issues), fail closed for security
			this.logger.error(`Unexpected error for organization ${organizationId}`, error)
			throw new ForbiddenException("Unable to verify subscription status")
		}
	}
}

@Injectable()
class BillingWebhookGuard implements CanActivate {
	private readonly logger = new Logger(BillingWebhookGuard.name)

	constructor(
		@Inject(BILLING_PROVIDER) private readonly billinProvider: BillingProvider,
		private readonly configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const secret = this.configService.getOrThrow<string>("billing.stripeWebhookSecret")

		const request = context.switchToHttp().getRequest<Request>()

		const signatute = request.headers["stripe-signature"]
		if (!signatute) return false

		try {
			this.billinProvider.webhooks.constructEvent(request.body as string, signatute, secret)
		} catch {
			this.logger.error("Failed to verify request")
			return false
		}

		return true
	}
}

export { BillingWebhookGuard, SubscriptionGuard }

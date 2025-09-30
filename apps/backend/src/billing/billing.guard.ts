import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from "@nestjs/common"

import { SubscriptionStatus } from "@repo/types/billing"

import { AuthRequest } from "~/auth/auth.guard"
import { BillingService } from "./billing.service"

@Injectable()
class SubscriptionGuard implements CanActivate {
	private readonly logger = new Logger(SubscriptionGuard.name)

	constructor(private readonly billingService: BillingService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		const organizationId = request.params?.organizationId
		if (!organizationId) {
			this.logger.warn("No organizationId found in request params")
			return false
		}

		try {
			// Get subscription
			const subscription = await this.billingService.safeGetSubscription(organizationId)
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

export { SubscriptionGuard }

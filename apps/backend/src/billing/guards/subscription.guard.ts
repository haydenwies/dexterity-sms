import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from "@nestjs/common"

import { SubscriptionStatus } from "@repo/types/billing"

import { AuthRequest } from "~/auth/auth.guard"
import { BillingService } from "~/billing/billing.service"

@Injectable()
class SubscriptionGuard implements CanActivate {
	private readonly logger = new Logger(SubscriptionGuard.name)

	constructor(private readonly billingService: BillingService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		const organizationId = request.params?.organizationId
		if (!organizationId) {
			this.logger.warn(`No organizationId found in request params while accessing ${request.route}`)
			return false
		}

		try {
			// Get subscription
			const subscription = await this.billingService.safeGetSubscription(organizationId)
			if (!subscription) {
				this.logger.warn(
					`No subscription found for organization ${organizationId} while accessing ${request.route}`
				)
				throw new ForbiddenException("An active subscription is required to perform this action")
			}

			// Check if subscription is in a valid state for usage
			const validStatuses = [SubscriptionStatus.ACTIVE, SubscriptionStatus.PAST_DUE]
			if (!validStatuses.includes(subscription.status)) {
				this.logger.warn(
					`Invalid subscription status '${subscription.status}' found for organization ${organizationId} while accessing ${request.route}`
				)
				throw new ForbiddenException("An active subscription is required to perform this action")
			}

			return true
		} catch (err: unknown) {
			if (err instanceof ForbiddenException) throw err

			// For any other errors (e.g., database issues), fail closed for security
			this.logger.error(`Unexpected error for organization ${organizationId}`, err)
			throw new ForbiddenException("Unable to verify subscription status")
		}
	}
}

export { SubscriptionGuard }

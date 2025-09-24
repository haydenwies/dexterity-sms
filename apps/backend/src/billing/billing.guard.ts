import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type Request } from "express"

import { BILLING_PROVIDER, type BillingProvider } from "~/billing/billing.provider"

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
			this.billinProvider.webhooks.constructEvent(request.body, signatute, secret)
		} catch {
			this.logger.error("Failed to verify request")
			return false
		}

		return true
	}
}

export { BillingWebhookGuard }

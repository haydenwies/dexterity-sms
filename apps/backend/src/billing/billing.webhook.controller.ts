import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import { type Request } from "express"

import { BillingWebhookGuard } from "~/billing/billing.guard"
import { BillingWebhookService } from "~/billing/billing.webhook.service"

@Controller("webhooks/billing")
class BillingWebhookController {
	constructor(private readonly billingWebhookService: BillingWebhookService) {}

	@UseGuards(BillingWebhookGuard)
	@Post()
	async handleEvent(@Req() request: Request): Promise<void> {
		await this.billingWebhookService.handleEvent(request)
	}
}

export { BillingWebhookController }

import { Controller, Get, Param, Post, Query, type RawBodyRequest, Req, UseGuards } from "@nestjs/common"
import { type Request } from "express"

import { SubscriptionModel } from "@repo/types/billing"

import { AuthGuard } from "~/auth/auth.guard"
import { BillingService, BillingWebhookService } from "~/billing/billing.service"
import { toSubscriptionDto } from "~/billing/billing.utils"
import { OrganizationGuard } from "~/organization/organization.guard"

@UseGuards(AuthGuard, OrganizationGuard)
@Controller("organizations/:organizationId/billing")
class BillingController {
	constructor(private readonly billingService: BillingService) {}

	@Get("checkout")
	async getCheckoutSession(
		@Param("organizationId") organizationId: string,
		@Query("callbackUrl") callbackUrl: string
	): Promise<{ url: string }> {
		const { url } = await this.billingService.getCheckoutSession(organizationId, callbackUrl)

		return { url }
	}

	@Get("billing-portal")
	async getBillingPortalSessionUrl(
		@Param("organizationId") organizationId: string,
		@Query("callbackUrl") callbackUrl: string
	): Promise<{ url: string }> {
		const { url } = await this.billingService.getBillingPortalSession(organizationId, callbackUrl)

		return { url }
	}

	@Get("subscription")
	async getSubscription(@Param("organizationId") organizationId: string): Promise<SubscriptionModel> {
		const subscription = await this.billingService.getSubscription(organizationId)

		return toSubscriptionDto(subscription)
	}
}

@Controller("webhooks/billing")
class BillingWebhookController {
	constructor(private readonly billingWebhookService: BillingWebhookService) {}

	@Post()
	async handleWebhookEvent(@Req() req: RawBodyRequest<Request>): Promise<void> {
		await this.billingWebhookService.handleWebhookEvent(req)
	}
}

export { BillingController, BillingWebhookController }

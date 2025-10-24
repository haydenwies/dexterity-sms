import { Body, Controller, Get, Param, Post, type RawBodyRequest, Req, UseGuards } from "@nestjs/common"
import { type Request } from "express"

import {
	type BillingPortalSessionDto,
	type CheckoutSessionDto,
	type CreateBillingPortalSessionDto,
	createBillingPortalSessionDtoSchema,
	type CreateCheckoutSessionDto,
	createCheckoutSessionDtoSchema,
	SubscriptionModel
} from "@dexterity-sms/core/billing"

import { AuthGuard } from "~/auth/auth.guard"
import { BillingService, BillingWebhookService } from "~/billing/billing.service"
import { toBillingPortalSessionDto, toCheckoutSessionDto, toSubscriptionDto } from "~/billing/billing.utils"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { MemberGuard } from "~/organization/guards/member.guard"

// #region BillingController

@UseGuards(AuthGuard, MemberGuard)
@Controller("organizations/:organizationId/billing")
class BillingController {
	constructor(private readonly billingService: BillingService) {}

	@Post("billing-portal")
	async createBillingPortalSession(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createBillingPortalSessionDtoSchema)) body: CreateBillingPortalSessionDto
	): Promise<BillingPortalSessionDto> {
		const billingPortalSession = await this.billingService.createBillingPortalSession(organizationId, body)

		return toBillingPortalSessionDto(billingPortalSession)
	}

	@Post("checkout")
	async createCheckoutSession(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createCheckoutSessionDtoSchema)) body: CreateCheckoutSessionDto
	): Promise<CheckoutSessionDto> {
		const checkoutSession = await this.billingService.createCheckoutSession(organizationId, body)

		return toCheckoutSessionDto(checkoutSession)
	}

	@Get("subscription")
	async getSubscription(@Param("organizationId") organizationId: string): Promise<SubscriptionModel> {
		const subscription = await this.billingService.getSubscription(organizationId)

		return toSubscriptionDto(subscription)
	}
}

// #endregion

// #region BillingWebhookController

@Controller("webhooks/billing")
class BillingWebhookController {
	constructor(private readonly billingWebhookService: BillingWebhookService) {}

	@Post()
	async handleWebhookEvent(@Req() req: RawBodyRequest<Request>): Promise<void> {
		await this.billingWebhookService.handleWebhookEvent(req)
	}
}

// #endregion

export { BillingController, BillingWebhookController }

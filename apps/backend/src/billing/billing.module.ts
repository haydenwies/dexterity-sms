import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingController } from "~/billing/billing.controller"
import { BillingListener } from "~/billing/billing.listener"
import { billingProviderFactory } from "~/billing/billing.provider"
import { BillingService } from "~/billing/billing.service"
import { OrganizationModule } from "~/organization/organization.module"
import { BillingWebhookController } from "./billing.webhook.controller"
import { BillingWebhookService } from "./billing.webhook.service"

@Module({
	imports: [AuthModule, OrganizationModule],
	controllers: [BillingController, BillingWebhookController],
	providers: [billingProviderFactory, BillingService, BillingListener, BillingWebhookService],
	exports: [BillingService]
})
class BillingModule {}

export { BillingModule }

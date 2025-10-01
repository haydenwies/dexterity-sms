import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingController, BillingWebhookController } from "~/billing/billing.controller"
import { BillingListener } from "~/billing/billing.listener"
import { BillingService, BillingWebhookService } from "~/billing/billing.service"
import { SubscriptionRepository } from "~/billing/repositories/subscription.repository"
import { DatabaseModule } from "~/database/database.module"
import { OrganizationModule } from "~/organization/organization.module"

@Module({
	imports: [AuthModule, OrganizationModule, DatabaseModule],
	controllers: [BillingController, BillingWebhookController],
	providers: [BillingListener, BillingService, BillingWebhookService, SubscriptionRepository],
	exports: [BillingService]
})
class BillingModule {}

export { BillingModule }

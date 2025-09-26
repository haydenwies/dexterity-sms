import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingController } from "~/billing/billing.controller"
import { BillingListener } from "~/billing/billing.listener"
import { billingProviderFactory } from "~/billing/billing.provider"
import { BillingService } from "~/billing/billing.service"
import { SubscriptionModule } from "~/billing/subscription/subscription.module"
import { OrganizationModule } from "~/organization/organization.module"

@Module({
	imports: [AuthModule, OrganizationModule, SubscriptionModule],
	controllers: [BillingController],
	providers: [billingProviderFactory, BillingService, BillingListener],
	exports: [SubscriptionModule]
})
class BillingModule {}

export { BillingModule }

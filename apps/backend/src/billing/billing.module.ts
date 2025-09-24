import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingController } from "~/billing/billing.controller"
import { BillingService } from "~/billing/billing.service"
import { SubscriptionModule } from "~/billing/subscription/subscription.module"
import { OrganizationModule } from "~/organization/organization.module"
import { billingProviderFactory } from "./billing.provider"

@Module({
	imports: [AuthModule, OrganizationModule, SubscriptionModule],
	controllers: [BillingController],
	providers: [billingProviderFactory, BillingService]
})
class BillingModule {}

export { BillingModule }

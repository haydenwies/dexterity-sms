import { Module } from "@nestjs/common"

import { SubscriptionRepository } from "~/billing/subscription/subscription.repository"
import { SubscriptionService } from "~/billing/subscription/subscription.service"
import { DatabaseModule } from "~/database/database.module"

@Module({
	imports: [DatabaseModule],
	providers: [SubscriptionService, SubscriptionRepository],
	exports: [SubscriptionService]
})
class SubscriptionModule {}

export { SubscriptionModule }

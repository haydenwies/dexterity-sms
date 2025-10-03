import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingModule } from "~/billing/billing.module"
import { CampaignController } from "~/campaign/campaign.controller"
import { CAMPAIGN_QUEUE, CampaignQueueConsumer } from "~/campaign/campaign.queue"
import { CampaignService } from "~/campaign/campaign.service"
import { CampaignRepository } from "~/campaign/repositories/campaign.repository"
import { ContactModule } from "~/contact/contact.module"
import { DatabaseModule } from "~/database/database.module"
import { MessageModule } from "~/message/message.module"
import { OrganizationModule } from "~/organization/organization.module"
import { SenderModule } from "~/sender/sender.module"
import { UnsubscribeModule } from "~/unsubscribe/unsubscribe.module"

@Module({
	imports: [
		BullModule.registerQueue({ name: CAMPAIGN_QUEUE }),
		AuthModule,
		BillingModule,
		OrganizationModule,
		DatabaseModule,
		ContactModule,
		SenderModule,
		MessageModule,
		UnsubscribeModule
	],
	controllers: [CampaignController],
	providers: [CampaignService, CampaignQueueConsumer, CampaignRepository]
})
class CampaignModule {}

export { CampaignModule }

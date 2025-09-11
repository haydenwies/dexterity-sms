import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { CampaignController } from "~/campaign/campaign.controller"
import { CAMPAIGN_QUEUE, CampaignQueueConsumer } from "~/campaign/campaign.queue"
import { CampaignRepository } from "~/campaign/campaign.repository"
import { CampaignService } from "~/campaign/campaign.service"
import { ContactModule } from "~/contact/contact.module"
import { DatabaseModule } from "~/database/database.module"
import { OrganizationModule } from "~/organization/organization.module"
import { SenderModule } from "~/sender/sender.module"
import { SmsModule } from "~/sms/sms.module"

@Module({
	imports: [
		BullModule.registerQueue({ name: CAMPAIGN_QUEUE }),
		AuthModule,
		OrganizationModule,
		DatabaseModule,
		ContactModule,
		SenderModule,
		SmsModule
	],
	controllers: [CampaignController],
	providers: [CampaignService, CampaignQueueConsumer, CampaignRepository]
})
class CampaignModule {}

export { CampaignModule }

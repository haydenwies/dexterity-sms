import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { CampaignController } from "~/campaign/campaign.controller"
import { CampaignRepository } from "~/campaign/campaign.repository"
import { CampaignService } from "~/campaign/campaign.service"
import { DatabaseModule } from "~/database/database.module"

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [CampaignController],
	providers: [CampaignService, CampaignRepository]
})
class CampaignModule {}

export { CampaignModule }

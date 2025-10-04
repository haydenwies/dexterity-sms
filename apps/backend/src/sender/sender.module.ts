import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingModule } from "~/billing/billing.module"
import { DatabaseModule } from "~/database/database.module"
import { OrganizationModule } from "~/organization/organization.module"
import { SenderRepository } from "~/sender/repositories/sender.repository"
import { SenderController } from "~/sender/sender.controller"
import { SenderService } from "~/sender/sender.service"
import { SmsModule } from "~/sms/sms.module"

@Module({
	imports: [DatabaseModule, AuthModule, OrganizationModule, BillingModule, SmsModule],
	controllers: [SenderController],
	providers: [SenderService, SenderRepository],
	exports: [SenderService]
})
class SenderModule {}

export { SenderModule }

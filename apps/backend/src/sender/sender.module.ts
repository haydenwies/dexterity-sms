import { Module } from "@nestjs/common"
import { AuthModule } from "~/auth/auth.module"

import { DatabaseModule } from "~/database/database.module"
import { SenderController } from "~/sender/sender.controller"
import { SenderRepository } from "~/sender/sender.repository"
import { SenderService } from "~/sender/sender.service"

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [SenderController],
	providers: [SenderService, SenderRepository],
	exports: [SenderService]
})
class SenderModule {}

export { SenderModule }

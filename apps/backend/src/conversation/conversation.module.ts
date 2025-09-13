import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { ConversationController } from "~/conversation/conversation.controller"
import { ConversationRepository } from "~/conversation/conversation.repository"
import { ConversationService } from "~/conversation/conversation.service"
import { DatabaseModule } from "~/database/database.module"
import { EVENT_QUEUE } from "~/event/event.types"
import { MessageModule } from "~/message/message.module"
import { OrganizationModule } from "~/organization/organization.module"

@Module({
	imports: [
		BullModule.registerQueue({ name: EVENT_QUEUE }),
		AuthModule,
		OrganizationModule,
		DatabaseModule,
		MessageModule
	],
	controllers: [ConversationController],
	providers: [ConversationService, ConversationRepository]
})
class ConversationModule {}

export { ConversationModule }

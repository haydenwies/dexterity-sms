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
import { SenderModule } from "~/sender/sender.module"
import { ConversationEventConsumer } from "./conversation.event-consumer"

@Module({
	imports: [
		BullModule.registerQueue({ name: EVENT_QUEUE }),
		AuthModule,
		OrganizationModule,
		DatabaseModule,
		SenderModule,
		MessageModule
	],
	controllers: [ConversationController],
	providers: [ConversationEventConsumer, ConversationService, ConversationRepository]
})
class ConversationModule {}

export { ConversationModule }

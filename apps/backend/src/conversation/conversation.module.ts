import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingModule } from "~/billing/billing.module"
import { ConversationController } from "~/conversation/conversation.controller"
import { ConversationListener } from "~/conversation/conversation.listener"
import { ConversationRepository } from "~/conversation/conversation.repository"
import { ConversationService } from "~/conversation/conversation.service"
import { DatabaseModule } from "~/database/database.module"
import { MessageModule } from "~/message/message.module"
import { OrganizationModule } from "~/organization/organization.module"
import { SenderModule } from "~/sender/sender.module"
import { UnsubscribeModule } from "~/unsubscribe/unsubscribe.module"

@Module({
	imports: [
		AuthModule,
		BillingModule,
		OrganizationModule,
		DatabaseModule,
		SenderModule,
		MessageModule,
		UnsubscribeModule
	],
	controllers: [ConversationController],
	providers: [ConversationService, ConversationRepository, ConversationListener]
})
class ConversationModule {}

export { ConversationModule }

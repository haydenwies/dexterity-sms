import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { BillingModule } from "~/billing/billing.module"
import { ConversationController } from "~/conversation/conversation.controller"
import { ConversationListener } from "~/conversation/conversation.listener"
import { ConversationService } from "~/conversation/conversation.service"
import { ConversationRepository } from "~/conversation/repositories/conversation.repository"
import { DatabaseModule } from "~/database/database.module"
import { MessageModule } from "~/message/message.module"
import { OrganizationModule } from "~/organization/organization.module"
import { SenderModule } from "~/sender/sender.module"
import { UnsubscribeModule } from "~/unsubscribe/unsubscribe.module"

@Module({
	imports: [
		AuthModule,
		OrganizationModule,
		BillingModule,
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

import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { DatabaseModule } from "~/database/database.module"
import { MESSAGE_QUEUE, MessageQueueConsumer } from "~/message/message.queue"
import { MessageRepository } from "~/message/message.repository"
import { MessageService } from "~/message/message.service"
import { MessageWebhookController } from "~/message/message.webhook.controller"
import { MessageWebhookService } from "~/message/message.webhook.service"
import { SenderModule } from "~/sender/sender.module"
import { SmsModule } from "~/sms/sms.module"
import { UnsubscribeModule } from "~/unsubscribe/unsubscribe.module"

@Module({
	imports: [
		BullModule.registerQueue({ name: MESSAGE_QUEUE }),
		DatabaseModule,
		SenderModule,
		SmsModule,
		UnsubscribeModule
	],
	controllers: [MessageWebhookController],
	providers: [MessageService, MessageRepository, MessageQueueConsumer, MessageWebhookService],
	exports: [MessageService]
})
class MessageModule {}

export { MessageModule }

import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { DatabaseModule } from "~/database/database.module"
import { MessageWebhookController } from "~/message/message.controller"
import { MESSAGE_QUEUE, MessageQueueConsumer } from "~/message/message.queue"
import { MessageService, MessageWebhookService } from "~/message/message.service"
import { MessageRepository } from "~/message/repositories/message.repository"
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
	providers: [MessageService, MessageWebhookService, MessageQueueConsumer, MessageRepository],
	exports: [MessageService]
})
class MessageModule {}

export { MessageModule }

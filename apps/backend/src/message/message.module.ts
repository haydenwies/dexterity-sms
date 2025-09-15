import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { DatabaseModule } from "~/database/database.module"
import { EVENT_QUEUE } from "~/event/event.types"
import { MESSAGE_QUEUE, MessageQueueConsumer } from "~/message/message.queue"
import { MessageRepository } from "~/message/message.repository"
import { MessageService } from "~/message/message.service"
import { SenderModule } from "~/sender/sender.module"
import { SmsModule } from "~/sms/sms.module"

@Module({
	imports: [
		BullModule.registerQueue({ name: MESSAGE_QUEUE }, { name: EVENT_QUEUE }),
		DatabaseModule,
		SenderModule,
		SmsModule
	],
	providers: [MessageService, MessageRepository, MessageQueueConsumer],
	exports: [MessageService]
})
class MessageModule {}

export { MessageModule }

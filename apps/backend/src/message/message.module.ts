import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { DatabaseModule } from "~/database/database.module"
import { MESSAGE_QUEUE, MessageQueueConsumer } from "~/message/message.queue"
import { MessageRepository } from "~/message/message.repository"
import { MessageService } from "~/message/message.service"
import { SmsModule } from "~/sms/sms.module"

@Module({
	imports: [BullModule.registerQueue({ name: MESSAGE_QUEUE }), DatabaseModule, SmsModule],
	providers: [MessageService, MessageRepository, MessageQueueConsumer],
	exports: [MessageService]
})
class MessageModule {}

export { MessageModule }

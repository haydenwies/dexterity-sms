import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { MESSAGE_QUEUE, MessageQueueConsumer } from "~/message/message.queue"
import { MessageService } from "~/message/message.service"
import { SmsModule } from "~/sms/sms.module"

@Module({
	imports: [BullModule.registerQueue({ name: MESSAGE_QUEUE }), SmsModule],
	providers: [MessageService, MessageQueueConsumer],
	exports: [MessageService]
})
class MessageModule {}

export { MessageModule }

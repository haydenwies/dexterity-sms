import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"

import { SMS_QUEUE, SmsQueueConsumer } from "~/sms/sms.queue"
import { SmsService } from "~/sms/sms.service"

@Module({
	imports: [BullModule.registerQueue({ name: SMS_QUEUE })],
	providers: [SmsService, SmsQueueConsumer],
	exports: [SmsService]
})
class SmsModule {}

export { SmsModule }

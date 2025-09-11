import { InjectQueue } from "@nestjs/bullmq"
import { Injectable } from "@nestjs/common"
import { Queue } from "bullmq"

import { Phone } from "~/common/phone.vo"
import { SMS_QUEUE, SMS_QUEUE_JOB } from "~/sms/sms.queue"

@Injectable()
class SmsService {
	constructor(@InjectQueue(SMS_QUEUE) private readonly smsQueue: Queue) {}

	async send(payload: { from: Phone; to: Phone; body: string }) {
		await this.smsQueue.add(SMS_QUEUE_JOB.SEND, {
			from: payload.from.value,
			to: payload.to.value,
			body: payload.body
		})
	}
}

export { SmsService }

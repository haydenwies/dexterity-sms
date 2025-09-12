import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Inject } from "@nestjs/common"
import { Job } from "bullmq"

import { Phone } from "~/common/phone.vo"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"

const MESSAGE_QUEUE = "message-queue"

enum MESSAGE_QUEUE_JOB {
	SEND = "send"
}

@Processor(MESSAGE_QUEUE)
class MessageQueueConsumer extends WorkerHost {
	constructor(@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider) {
		super()
	}

	async process(job: Job) {
		switch (job.name) {
			case MESSAGE_QUEUE_JOB.SEND: {
				const { from, to, body } = job.data // TODO: Validate job data
				const fromPhone = Phone.create(from)
				const toPhone = Phone.create(to)

				return this.processSend({ from: fromPhone, to: toPhone, body })
			}
		}
	}

	private async processSend(payload: { from: Phone; to: Phone; body: string }): Promise<void> {
		await this.smsProvider.send({
			from: payload.from,
			to: payload.to,
			body: payload.body
		})
	}
}

export { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB, MessageQueueConsumer }

import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Job } from "bullmq"

import { Phone } from "~/common/phone.vo"

const SMS_QUEUE = "sms-queue"

enum SMS_QUEUE_JOB {
	SEND = "send"
}

@Processor(SMS_QUEUE)
class SmsQueueConsumer extends WorkerHost {
	async process(job: Job) {
		switch (job.name) {
			case SMS_QUEUE_JOB.SEND: {
				const { from, to, body } = job.data // TODO: Validate job data
				const fromPhone = Phone.create(from)
				const toPhone = Phone.create(to)

				return this.processSend({ from: fromPhone, to: toPhone, body })
			}
		}
	}

	private async processSend(payload: { from: Phone; to: Phone; body: string }) {
		// TODO: Implement SMS sending
		console.log("Sending SMS to", payload.to.value, "from", payload.from.value, "with body", payload.body)
	}
}

export { SMS_QUEUE, SMS_QUEUE_JOB, SmsQueueConsumer }

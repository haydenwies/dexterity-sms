import { InjectQueue } from "@nestjs/bullmq"
import { Injectable } from "@nestjs/common"
import { Queue } from "bullmq"

import { Phone } from "~/common/phone.vo"
import { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB } from "~/message/message.queue"

@Injectable()
class MessageService {
	constructor(@InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue) {}

	async send(payload: { from: Phone; to: Phone; body: string }) {
		await this.messageQueue.add(MESSAGE_QUEUE_JOB.SEND, {
			from: payload.from.value,
			to: payload.to.value,
			body: payload.body
		})
	}
}

export { MessageService }

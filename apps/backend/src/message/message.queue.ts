import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Inject, NotFoundException } from "@nestjs/common"
import { Job } from "bullmq"

import { MessageStatus } from "@repo/types/message"

import { MessageRepository } from "~/message/message.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"

const MESSAGE_QUEUE = "message-queue"

enum MESSAGE_QUEUE_JOB {
	SEND = "send"
}

@Processor(MESSAGE_QUEUE)
class MessageQueueConsumer extends WorkerHost {
	constructor(
		private readonly messageRepository: MessageRepository,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider
	) {
		super()
	}

	async process(job: Job) {
		switch (job.name) {
			case MESSAGE_QUEUE_JOB.SEND: {
				const { organizationId, messageId } = job.data // TODO: Validate job data

				return this.processSend(organizationId, messageId)
			}
		}
	}

	private async processSend(organizationId: string, messageId: string): Promise<void> {
		const message = await this.messageRepository.find(organizationId, messageId)
		if (!message) throw new NotFoundException("Message not found")

		try {
			// Send via SMS provider
			const result = await this.smsProvider.send({
				from: message.from.value,
				to: message.to.value,
				body: message.body
			})

			message.updateExternalId(result.id)
			message.updateStatus(MessageStatus.SENT)
			await this.messageRepository.update(message)
		} catch (err: unknown) {
			message.updateStatus(MessageStatus.FAILED)
			await this.messageRepository.update(message)

			throw err
		}
	}
}

export { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB, MessageQueueConsumer }

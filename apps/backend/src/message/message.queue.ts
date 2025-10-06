import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Inject, Logger, NotFoundException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Job } from "bullmq"

import { routes } from "@repo/routes"
import { MessageStatus } from "@repo/types/message"

import { MessageRepository } from "~/message/repositories/message.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

const MESSAGE_QUEUE = "message-queue"

enum MessageQueueJobName {
	SEND = "send"
}

type MessageQueueSendJobData = {
	organizationId: string
	messageId: string
	bypassUnsubscribeCheck?: boolean
}

type MessageQueueJob = Job<MessageQueueSendJobData, void, MessageQueueJobName.SEND>

@Processor(MESSAGE_QUEUE)
class MessageQueueConsumer extends WorkerHost {
	private readonly logger = new Logger(MessageQueueConsumer.name)

	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly configService: ConfigService,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider,
		private readonly unsubscribeService: UnsubscribeService
	) {
		super()
	}

	async process(job: MessageQueueJob): Promise<void> {
		switch (job.name) {
			case MessageQueueJobName.SEND: {
				return this.processSend(job.data)
			}
		}
	}

	private async processSend(data: MessageQueueSendJobData): Promise<void> {
		// Extract data
		const { organizationId, messageId, bypassUnsubscribeCheck = false } = data

		// Find message
		const message = await this.messageRepository.find(organizationId, messageId)
		if (!message) throw new NotFoundException("Message not found")

		// Check if the recipient is unsubscribed (unless bypassed)
		if (!bypassUnsubscribeCheck) {
			const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, message.to)
			if (isUnsubscribed) {
				this.logger.warn(`Cannot send message ${message.id} to unsubscribed phone number: ${message.to.value}`)

				// Mark message as failed due to unsubscribe
				message.updateStatus(MessageStatus.FAILED)
				await this.messageRepository.update(message)
				return
			}
		} else this.logger.log(`Bypassing unsubscribe check for message ${message.id}`)

		try {
			const statusCallbackUrl = `${this.configService.getOrThrow<string>("router.backendPublicUrl")}${routes.backend.MESSAGE_STATUS_WEBHOOK}`

			// Send via SMS provider
			const result = await this.smsProvider.send({
				from: message.from.value,
				to: message.to.value,
				body: message.body,
				statusCallback: statusCallbackUrl
			})

			// Update message external ID and status
			message.updateExternalId(result.id)
			message.updateStatus(MessageStatus.SENT)
			await this.messageRepository.update(message)
		} catch (err: unknown) {
			// Update message status to failed
			message.updateStatus(MessageStatus.FAILED)
			await this.messageRepository.update(message)

			throw err
		}
	}
}

export { MESSAGE_QUEUE, MessageQueueConsumer, MessageQueueJobName, type MessageQueueJob }

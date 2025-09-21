import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Inject, Logger, NotFoundException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Job } from "bullmq"

import { routes } from "@repo/routes"
import { MessageStatus } from "@repo/types/message"

import { MessageRepository } from "~/message/message.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

const MESSAGE_QUEUE = "message-queue"

enum MESSAGE_QUEUE_JOB {
	SEND = "send"
}

@Processor(MESSAGE_QUEUE)
class MessageQueueConsumer extends WorkerHost {
	private readonly logger = new Logger(MessageQueueConsumer.name)

	constructor(
		private readonly configService: ConfigService,
		private readonly messageRepository: MessageRepository,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider,
		private readonly unsubscribeService: UnsubscribeService
	) {
		super()
	}

	async process(job: Job): Promise<void> {
		switch (job.name) {
			case MESSAGE_QUEUE_JOB.SEND: {
				const { organizationId, messageId, bypassUnsubscribeCheck } = job.data // TODO: Validate job data

				return this.processSend(organizationId, messageId, bypassUnsubscribeCheck || false)
			}
		}
	}

	private async processSend(
		organizationId: string,
		messageId: string,
		bypassUnsubscribeCheck = false
	): Promise<void> {
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
			const statusCallbackUrl = `${this.configService.getOrThrow<string>("router.backendUrl")}${routes.backend.MESSAGE_STATUS_WEBHOOK}`

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

export { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB, MessageQueueConsumer }

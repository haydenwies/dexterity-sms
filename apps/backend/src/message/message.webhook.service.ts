import { Inject, Injectable, Logger } from "@nestjs/common"

import { StatusWebhookEvent } from "@repo/sms"
import { MessageStatus } from "@repo/types/message"

import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { MessageRepository } from "./message.repository"

@Injectable()
class MessageWebhookService {
	private readonly logger = new Logger(MessageWebhookService.name)

	constructor(
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider,
		private readonly messageRepository: MessageRepository
	) {}

	async handleStatusUpdate(payload: StatusWebhookEvent): Promise<void> {
		// Find the message by external ID
		const message = await this.messageRepository.findByExternalId(payload.messageId)
		if (!message) {
			this.logger.warn(`Message with external ID ${payload.messageId} not found`)
			return
		}

		// Map webhook status to internal message status
		const messageStatus = this.mapWebhookStatusToMessageStatus(payload.status)
		if (!messageStatus) {
			this.logger.warn(`Unknown webhook status found when mapping ${payload.messageId} to message status`)
			return
		}

		// Update message status
		try {
			message.updateStatus(messageStatus)
			await this.messageRepository.update(message)

			this.logger.log(`Successfully updated message ${message.id} status to ${message.status}`)
		} catch (error: unknown) {
			this.logger.error("Failed to update message status", { error })
		}
	}

	private mapWebhookStatusToMessageStatus(webhookStatus: StatusWebhookEvent["status"]): MessageStatus | null {
		switch (webhookStatus) {
			case "pending":
				return MessageStatus.PENDING
			case "sent":
				return MessageStatus.SENT
			case "delivered":
				return MessageStatus.DELIVERED
			case "failed":
				return MessageStatus.FAILED
			default:
				return null
		}
	}
}

export { MessageWebhookService }

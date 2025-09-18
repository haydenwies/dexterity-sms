import { Inject, Injectable, Logger } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import { type InboundWebhookEvent, type StatusWebhookEvent } from "@repo/sms"
import { MessageDirection, MessageStatus } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { EVENT_TOPIC, type MessageCreatedEvent } from "~/event/event.types"
import { Message } from "~/message/message.entity"
import { toMessageCreatedEvent } from "~/message/message.utils"
import { SenderService } from "~/sender/sender.service"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { MessageRepository } from "./message.repository"

@Injectable()
class MessageWebhookService {
	private readonly logger = new Logger(MessageWebhookService.name)

	constructor(
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider,
		private readonly messageRepository: MessageRepository,
		private readonly senderService: SenderService,
		private readonly eventEmitter: EventEmitter2
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

	async handleInboundMessage(payload: InboundWebhookEvent): Promise<void> {
		this.logger.log(`Processing inbound message ${payload.messageId}`)

		// Check if message already exists (deduplication)
		const existingMessage = await this.messageRepository.findByExternalId(payload.messageId)
		if (existingMessage) {
			this.logger.warn("Inbound message already exists, skipping", {
				messageId: payload.messageId,
				existingId: existingMessage.id
			})
			return
		}

		// Find the organization by the recipient phone number (our sender number)
		const toPhone = Phone.create(payload.to)
		const sender = await this.senderService.findByPhone(toPhone)
		if (!sender) {
			this.logger.warn("No sender found for inbound message recipient", {
				to: payload.to,
				messageId: payload.messageId
			})
			return
		}

		// Create the inbound message
		const fromPhone = Phone.create(payload.from)
		const message = Message.create({
			externalId: payload.messageId,
			organizationId: sender.organizationId,
			direction: MessageDirection.INBOUND,
			status: MessageStatus.RECEIVED,
			from: fromPhone,
			to: toPhone,
			body: payload.body
		})

		try {
			const createdMessage = await this.messageRepository.create(message)

			this.logger.log("Successfully created inbound message", {
				messageId: createdMessage.id,
				externalId: payload.messageId,
				organizationId: sender.organizationId
			})

			// Emit message created event to trigger conversation handling
			const messageCreatedEvent: MessageCreatedEvent = toMessageCreatedEvent(createdMessage)
			await this.eventEmitter.emitAsync(EVENT_TOPIC.MESSAGE_CREATED, messageCreatedEvent)

			this.logger.log("Emitted message created event for inbound message", {
				messageId: createdMessage.id
			})
		} catch (err: unknown) {
			this.logger.error("Failed to create inbound message", {
				messageId: payload.messageId,
				organizationId: sender.organizationId,
				error: err
			})
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

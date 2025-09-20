import { InjectQueue } from "@nestjs/bullmq"
import { Inject, Injectable, Logger } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { Queue } from "bullmq"

import { type InboundWebhookEvent, type StatusWebhookEvent } from "@repo/sms"
import { MessageDirection, MessageStatus } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { EVENT_TOPIC, type MessageCreatedEvent } from "~/event/event.types"
import { Message } from "~/message/message.entity"
import { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB } from "~/message/message.queue"
import { toMessageCreatedEvent } from "~/message/message.utils"
import { SenderService } from "~/sender/sender.service"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"
import { MessageRepository } from "./message.repository"

@Injectable()
class MessageWebhookService {
	private readonly logger = new Logger(MessageWebhookService.name)

	constructor(
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider,
		private readonly messageRepository: MessageRepository,
		private readonly senderService: SenderService,
		private readonly eventEmitter: EventEmitter2,
		private readonly unsubscribeService: UnsubscribeService,
		@InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue
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
			this.logger.warn(`Inbound message with external ID ${existingMessage.externalId} already exists, skipping`)
			return
		}

		// Find the organization by the recipient phone number (our sender number)
		const toPhone = Phone.create(payload.to)
		const sender = await this.senderService.findByPhone(toPhone)
		if (!sender) {
			this.logger.warn(`No sender found for inbound message recipient ${payload.to}`)
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

			// Process unsubscribe/resubscribe keywords directly
			await this.processUnsubscribeKeywords(payload.body, sender.organizationId, fromPhone, toPhone)

			// Emit message created event to trigger conversation handling
			const messageCreatedEvent: MessageCreatedEvent = toMessageCreatedEvent(createdMessage)
			await this.eventEmitter.emitAsync(EVENT_TOPIC.MESSAGE_CREATED, messageCreatedEvent)

			this.logger.log(`Emitted message created event for inbound message ${createdMessage.id}`)
		} catch (err: unknown) {
			this.logger.error("Failed to create inbound message", {
				messageId: payload.messageId,
				organizationId: sender.organizationId,
				error: err
			})
		}
	}

	/**
	 * Process unsubscribe/resubscribe keywords in inbound messages
	 */
	private async processUnsubscribeKeywords(
		messageBody: string,
		organizationId: string,
		fromPhone: Phone,
		toPhone: Phone
	): Promise<void> {
		try {
			// Check for unsubscribe keywords
			if (this.unsubscribeService.isUnsubscribeMessage(messageBody)) {
				this.logger.log(
					`Processing unsubscribe request from ${fromPhone.value} for organization ${organizationId}`
				)

				// Unsubscribe the phone number
				await this.unsubscribeService.unsubscribe(organizationId, fromPhone)

				// Send confirmation reply
				await this.sendAutoReply(
					organizationId,
					toPhone,
					fromPhone,
					this.unsubscribeService.getUnsubscribeReplyMessage()
				)
				return
			}

			// Check for resubscribe keywords
			if (this.unsubscribeService.isResubscribeMessage(messageBody)) {
				this.logger.log(
					`Processing resubscribe request from ${fromPhone.value} for organization ${organizationId}`
				)

				// Resubscribe the phone number
				await this.unsubscribeService.resubscribe(organizationId, fromPhone)

				// Send confirmation reply
				await this.sendAutoReply(
					organizationId,
					toPhone,
					fromPhone,
					this.unsubscribeService.getResubscribeReplyMessage()
				)
				return
			}
		} catch (error: unknown) {
			this.logger.error("Error processing unsubscribe keywords", {
				organizationId,
				from: fromPhone.value,
				messageBody,
				error
			})
		}
	}

	/**
	 * Send auto-reply message (bypasses unsubscribe check)
	 */
	private async sendAutoReply(organizationId: string, from: Phone, to: Phone, messageBody: string): Promise<void> {
		try {
			// Create message entity for auto-reply
			const message = Message.create({
				organizationId,
				direction: MessageDirection.OUTBOUND,
				status: MessageStatus.PENDING,
				from,
				to,
				body: messageBody
			})

			// Save message to database
			const createdMessage = await this.messageRepository.create(message)

			// Emit message created event for conversation handling
			const messageCreatedEvent = toMessageCreatedEvent(createdMessage)
			await this.eventEmitter.emitAsync(EVENT_TOPIC.MESSAGE_CREATED, messageCreatedEvent)

			// Queue for sending with bypass flag (internal only)
			await this.messageQueue.add(MESSAGE_QUEUE_JOB.SEND, {
				organizationId: createdMessage.organizationId,
				messageId: createdMessage.id,
				bypassUnsubscribeCheck: true
			})
		} catch (error: unknown) {
			this.logger.error("Failed to queue unsubscribe auto-reply", {
				organizationId,
				from: from.value,
				to: to.value,
				error
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

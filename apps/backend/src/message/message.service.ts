import { InjectQueue } from "@nestjs/bullmq"
import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { Queue } from "bullmq"

import { MessageDirection, MessageStatus } from "@repo/types/message"

import { EventEmitter2 } from "@nestjs/event-emitter"
import { InboundWebhookEvent, StatusWebhookEvent } from "@repo/sms"
import { Event, type MessageCreatedEvent } from "~/common/event.types"
import { Phone } from "~/common/phone.vo"
import { Message } from "~/message/entities/message.entity"
import { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB } from "~/message/message.queue"
import { MessageRepository } from "~/message/repositories/message.repository"
import { SenderService } from "~/sender/sender.service"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"
import { toMessageCreatedEvent, toMessageUpdatedEvent } from "./message.utils"

// #region MessageService

@Injectable()
class MessageService {
	constructor(
		@InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue,
		private readonly messageRepository: MessageRepository,
		private readonly eventEmitter: EventEmitter2
	) {}

	async get(organizationId: string, messageId: string): Promise<Message> {
		const message = await this.messageRepository.find(organizationId, messageId)
		if (!message) throw new NotFoundException("Message not found")

		return message
	}

	async getMany(
		organizationId: string,
		filters?: { conversationId?: string; campaignId?: string }
	): Promise<Message[]> {
		const messages = await this.messageRepository.findMany(organizationId, filters)

		return messages
	}

	async count(
		organizationId: string,
		filters?: {
			conversationId?: string
			campaignId?: string
			status?: MessageStatus | MessageStatus[]
		}
	): Promise<number> {
		const count = await this.messageRepository.count(organizationId, filters)

		return count
	}

	async updateConversationId(organizationId: string, messageId: string, conversationId: string): Promise<Message> {
		const message = await this.messageRepository.find(organizationId, messageId)
		if (!message) throw new NotFoundException("Message not found")

		message.updateConversationId(conversationId)
		const updatedMessage = await this.messageRepository.update(message)

		await this.eventEmitter.emitAsync(Event.MESSAGE_UPDATED, toMessageUpdatedEvent(updatedMessage))

		return updatedMessage
	}

	async send(
		organizationId: string,
		payload: {
			body: string
			from: Phone
			to: Phone
			conversationId?: string
			campaignId?: string
		}
	): Promise<Message> {
		// Create message entity
		const message = Message.create({
			organizationId,
			conversationId: payload.conversationId,
			campaignId: payload.campaignId,
			direction: MessageDirection.OUTBOUND,
			status: MessageStatus.PENDING,
			from: payload.from,
			to: payload.to,
			body: payload.body
		})
		const createdMessage = await this.messageRepository.create(message)

		// Emit message created event
		const messageCreatedEvent: MessageCreatedEvent = toMessageCreatedEvent(createdMessage)
		await this.eventEmitter.emitAsync(Event.MESSAGE_CREATED, messageCreatedEvent)

		// Queue for sending
		await this.messageQueue.add(MESSAGE_QUEUE_JOB.SEND, {
			organizationId: createdMessage.organizationId,
			messageId: createdMessage.id
		})

		return createdMessage
	}
}

// #endregion

// #region MessageWebhookService

@Injectable()
class MessageWebhookService {
	private readonly logger = new Logger(MessageWebhookService.name)

	constructor(
		@InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue,
		private readonly messageRepository: MessageRepository,
		private readonly eventEmitter: EventEmitter2,
		private readonly senderService: SenderService,
		private readonly unsubscribeService: UnsubscribeService
	) {}

	async handleStatusUpdate(payload: StatusWebhookEvent): Promise<void> {
		this.logger.log(`Processing status update for message with external ID ${payload.messageId}`)

		// Find the message by external ID
		const message = await this.messageRepository.findByExternalId(payload.messageId)
		if (!message) {
			this.logger.warn(`Message with external ID ${payload.messageId} not found`)
			return
		}

		// Map webhook status to internal message status
		const newStatus = message.updateStatusFromProvider(payload.status)
		if (!newStatus) {
			this.logger.warn(`Unknown webhook status found when mapping ${payload.messageId} to message status`)
			return
		}

		// Update message status
		try {
			const updatedMessage = await this.messageRepository.update(message)

			await this.eventEmitter.emitAsync(Event.MESSAGE_UPDATED, toMessageUpdatedEvent(updatedMessage))

			this.logger.log(`Successfully updated message ${message.id} status to ${message.status}`)
		} catch (error: unknown) {
			this.logger.error("Failed to update message status", { error })
		}
	}

	async handleInboundMessage(payload: InboundWebhookEvent): Promise<void> {
		this.logger.log(`Processing inbound message with external ID ${payload.messageId}`)

		// Check if message already exists (deduplication)
		const existingMessage = await this.messageRepository.findByExternalId(payload.messageId)
		if (existingMessage) {
			this.logger.warn(`Inbound message with external ID ${existingMessage.externalId} already exists, skipping`)
			return
		}

		// Find the organization by the recipient phone number (organization sender)
		const toPhone = Phone.create(payload.to)
		const sender = await this.senderService.safeGetByPhone(toPhone)
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
			await this.processKeywords(sender.organizationId, fromPhone, toPhone, payload.body)

			// Emit message created event to trigger conversation handling
			const messageCreatedEvent: MessageCreatedEvent = toMessageCreatedEvent(createdMessage)
			await this.eventEmitter.emitAsync(Event.MESSAGE_CREATED, messageCreatedEvent)

			this.logger.log(`Emitted ${Event.MESSAGE_CREATED} for inbound message ${createdMessage.id}`)
		} catch (err: unknown) {
			this.logger.error("Failed to create inbound message", err)
		}
	}

	/**
	 * Process unsubscribe/resubscribe keywords in inbound messages
	 */
	private async processKeywords(organizationId: string, from: Phone, to: Phone, body: string): Promise<void> {
		try {
			// Check for unsubscribe keywords
			if (this.unsubscribeService.isUnsubscribeMessage(body)) {
				this.logger.log(`Processing unsubscribe request from ${from.value} for organization ${organizationId}`)

				// Unsubscribe the phone number
				await this.unsubscribeService.unsubscribe(organizationId, from)

				// Send confirmation reply
				await this.sendAutoReply(organizationId, to, from, this.unsubscribeService.getUnsubscribeReplyMessage())
			}

			// Check for resubscribe keywords
			if (this.unsubscribeService.isResubscribeMessage(body)) {
				this.logger.log(`Processing resubscribe request from ${from.value} for organization ${organizationId}`)

				// Resubscribe the phone number
				await this.unsubscribeService.resubscribe(organizationId, from)

				// Send confirmation reply
				await this.sendAutoReply(organizationId, to, from, this.unsubscribeService.getResubscribeReplyMessage())
			}
		} catch (err: unknown) {
			this.logger.error("Error processing unsubscribe keywords", err)
		}
	}

	/**
	 * Send auto-reply message (bypasses unsubscribe check)
	 */
	private async sendAutoReply(organizationId: string, from: Phone, to: Phone, body: string): Promise<void> {
		// Create message for auto-reply
		const message = Message.create({
			organizationId,
			direction: MessageDirection.OUTBOUND,
			from,
			to,
			body
		})

		try {
			const createdMessage = await this.messageRepository.create(message)

			// Emit message created event for conversation handling
			await this.eventEmitter.emitAsync(Event.MESSAGE_CREATED, toMessageCreatedEvent(createdMessage))

			// Queue for sending with bypass flag (internal only)
			await this.messageQueue.add(MESSAGE_QUEUE_JOB.SEND, {
				organizationId: createdMessage.organizationId,
				messageId: createdMessage.id,
				bypassUnsubscribeCheck: true
			})
		} catch (err: unknown) {
			this.logger.error("Failed to queue auto-reply", err)
		}
	}
}

// #endregion

export { MessageService, MessageWebhookService }

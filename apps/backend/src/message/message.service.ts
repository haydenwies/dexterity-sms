import { InjectQueue } from "@nestjs/bullmq"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Queue } from "bullmq"

import { MessageDirection, MessageStatus } from "@repo/types/message"

import { EventEmitter2 } from "@nestjs/event-emitter"
import { Event, type MessageCreatedEvent } from "~/common/event.types"
import { Phone } from "~/common/phone.vo"
import { Message } from "~/message/entities/message.entity"
import { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB } from "~/message/message.queue"
import { MessageRepository } from "~/message/repositories/message.repository"
import { toMessageCreatedEvent, toMessageUpdatedEvent } from "./message.utils"

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

export { MessageService }

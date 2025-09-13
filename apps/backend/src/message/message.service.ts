import { InjectQueue } from "@nestjs/bullmq"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Queue } from "bullmq"

import { MessageDirection, MessageStatus } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { EVENT_QUEUE, EVENT_TOPIC, MessageCreatedEvent } from "~/event/event.types"
import { Message } from "~/message/message.entity"
import { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB } from "~/message/message.queue"
import { MessageRepository } from "~/message/message.repository"

@Injectable()
class MessageService {
	constructor(
		@InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue,
		private readonly messageRepository: MessageRepository,
		@InjectQueue(EVENT_QUEUE) private readonly eventQueue: Queue
	) {}

	async updateConversationId(organizationId: string, messageId: string, conversationId: string): Promise<Message> {
		const message = await this.messageRepository.find(organizationId, messageId)
		if (!message) throw new NotFoundException("Message not found")

		message.updateConversationId(conversationId)
		return this.messageRepository.update(message)
	}

	async send(
		organizationId: string,
		payload: { body: string; from: Phone; to: Phone; campaignId?: string }
	): Promise<Message> {
		// Create message entity
		const message = Message.create({
			organizationId,
			body: payload.body,
			from: payload.from,
			to: payload.to,
			campaignId: payload.campaignId,
			direction: MessageDirection.OUTBOUND,
			status: MessageStatus.PENDING
		})
		const createdMessage = await this.messageRepository.create(message)

		// Publish message created event
		const messageCreatedEvent: MessageCreatedEvent = {
			messageId: createdMessage.id,
			organizationId: createdMessage.organizationId,
			conversationId: createdMessage.conversationId,
			from: createdMessage.from.value,
			to: createdMessage.to.value,
			direction: createdMessage.direction,
			campaignId: createdMessage.campaignId
		}
		await this.eventQueue.add(EVENT_TOPIC.MESSAGE_CREATED, messageCreatedEvent)

		// Queue for sending
		await this.messageQueue.add(MESSAGE_QUEUE_JOB.SEND, {
			organizationId: createdMessage.organizationId,
			messageId: createdMessage.id
		})

		return createdMessage
	}
}

export { MessageService }

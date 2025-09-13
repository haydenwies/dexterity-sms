import { InjectQueue } from "@nestjs/bullmq"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Queue } from "bullmq"

import { MessageDirection, MessageStatus } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { Message } from "~/message/message.entity"
import { MESSAGE_QUEUE, MESSAGE_QUEUE_JOB } from "~/message/message.queue"
import { MessageRepository } from "~/message/message.repository"

@Injectable()
class MessageService {
	constructor(
		@InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue,
		private readonly messageRepository: MessageRepository
	) {}

	async updateConversationId(organizationId: string, messageId: string, conversationId: string): Promise<Message> {
		const message = await this.messageRepository.find(organizationId, messageId)
		if (!message) throw new NotFoundException("Message not found")

		message.updateConversationId(conversationId)
		return this.messageRepository.update(message)
	}

	async send(organizationId: string, payload: { body: string; from: Phone; to: Phone }): Promise<Message> {
		// Create message entity
		const message = Message.create({
			organizationId,
			body: payload.body,
			from: payload.from,
			to: payload.to,
			direction: MessageDirection.OUTBOUND,
			status: MessageStatus.PENDING
		})

		// Persist to database
		const createdMessage = await this.messageRepository.create(message)

		// Queue for sending
		await this.messageQueue.add(MESSAGE_QUEUE_JOB.SEND, {
			organizationId: createdMessage.organizationId,
			messageId: createdMessage.id
		})

		return createdMessage
	}
}

export { MessageService }

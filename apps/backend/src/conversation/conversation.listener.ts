import { Injectable, Logger } from "@nestjs/common"
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter"

import { MessageDirection } from "@repo/types/message"

import { Event, type MessageCreatedEvent } from "~/common/event.types"
import { Phone } from "~/common/phone.vo"
import { toConversationCreatedEvent, toConversationUpdatedEvent } from "~/conversation/conversation.utils"
import { Conversation } from "~/conversation/entities/conversation.entity"
import { ConversationRepository } from "~/conversation/repositories/conversation.repository"
import { MessageService } from "~/message/message.service"

@Injectable()
class ConversationListener {
	private readonly logger = new Logger(ConversationListener.name)

	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly messageService: MessageService,
		private readonly eventEmitter: EventEmitter2
	) {}

	@OnEvent(Event.MESSAGE_CREATED)
	async processMessageCreated(payload: MessageCreatedEvent): Promise<void> {
		try {
			// Determine the conversation recipient from the message direction
			let recipient: Phone
			if (payload.direction === MessageDirection.OUTBOUND) recipient = Phone.create(payload.to)
			else recipient = Phone.create(payload.from)

			// Find or create the conversation
			let conversation = await this.conversationRepository.findByRecipient(payload.organizationId, recipient)
			if (!conversation) {
				// Create conversation if it doesn't exist
				conversation = Conversation.create({
					organizationId: payload.organizationId,
					recipient,
					unreadCount: 0,
					lastMessagePreview: payload.body,
					lastMessageAt: payload.createdAt
				})
				conversation = await this.conversationRepository.create(conversation)

				await this.eventEmitter.emitAsync(Event.CONVERSATION_CREATED, toConversationCreatedEvent(conversation))
			}

			// Link the message to the conversation if no conversation ID
			if (!payload.conversationId)
				await this.messageService.updateConversationId(
					payload.organizationId,
					payload.messageId,
					conversation.id
				)

			let conversationUpdated = false

			// Increment unread count if the message is inbound
			if (payload.direction === MessageDirection.INBOUND) {
				conversation.incrementUnreadCount()
				conversationUpdated = true
			}

			// Update conversation if the message is newer than the last message
			if (!conversation.lastMessageAt || payload.createdAt > conversation.lastMessageAt) {
				conversation.update({
					lastMessagePreview: payload.body,
					lastMessageAt: payload.createdAt
				})
				conversationUpdated = true
			}

			if (conversationUpdated) {
				const updatedConversation = await this.conversationRepository.update(conversation)
				await this.eventEmitter.emitAsync(
					Event.CONVERSATION_UPDATED,
					toConversationUpdatedEvent(updatedConversation)
				)
			}
		} catch (err: unknown) {
			this.logger.error("Error processing message created event", err)
		}
	}
}

export { ConversationListener }

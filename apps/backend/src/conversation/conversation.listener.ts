import { Injectable, Logger } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"

import { MessageDirection } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { Conversation } from "~/conversation/conversation.entity"
import { ConversationRepository } from "~/conversation/conversation.repository"
import { EVENT_TOPIC, type MessageCreatedEvent } from "~/event/event.types"
import { MessageService } from "~/message/message.service"

@Injectable()
class ConversationListener {
	private readonly logger = new Logger(ConversationListener.name)

	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly messageService: MessageService
	) {}

	@OnEvent(EVENT_TOPIC.MESSAGE_CREATED)
	async processMessageCreated(payload: MessageCreatedEvent): Promise<void> {
		try {
			// Skip if message is already linked to a conversation
			if (payload.conversationId) return

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
			}

			// Link the message to the conversation
			await this.messageService.updateConversationId(payload.organizationId, payload.messageId, conversation.id)

			// Update conversation if the message is newer than the last message
			let wasUpdated = false
			if (payload.direction === MessageDirection.OUTBOUND) {
				conversation.incrementUnreadCount()
				wasUpdated = true
			}
			if (payload.createdAt > conversation.lastMessageAt) {
				conversation.update({
					lastMessagePreview: payload.body,
					lastMessageAt: payload.createdAt
				})
				wasUpdated = true
			}
			if (wasUpdated) await this.conversationRepository.update(conversation)
		} catch (err: unknown) {
			this.logger.error(err) // TODO: Better error handling for listeners
		}
	}
}

export { ConversationListener }

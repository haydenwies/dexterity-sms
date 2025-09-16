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
				conversation = Conversation.create({ organizationId: payload.organizationId, recipient })
				conversation = await this.conversationRepository.create(conversation)
			}

			// Link the message to the conversation
			await this.messageService.updateConversationId(payload.organizationId, payload.messageId, conversation.id)
		} catch (err: unknown) {
			this.logger.error(err) // TODO: Better error handling for listeners
		}
	}
}

export { ConversationListener }

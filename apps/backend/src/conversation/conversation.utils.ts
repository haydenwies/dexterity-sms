import { type ConversationModel } from "@repo/types/conversation"

import { Conversation } from "~/conversation/conversation.entity"

const toConversationDto = (conversation: Conversation): ConversationModel => {
	return {
		id: conversation.id,
		organizationId: conversation.organizationId,
		recipient: conversation.recipient.value,
		unreadCount: conversation.unreadCount,
		lastMessagePreview: conversation.lastMessagePreview,
		lastMessageAt: conversation.lastMessageAt
	}
}

export { toConversationDto }

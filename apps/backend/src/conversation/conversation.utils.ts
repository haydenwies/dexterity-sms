import { type ConversationModel } from "@repo/types/conversation"

import { type Conversation } from "~/conversation/conversation.entity"
import { ConversationUpdatedEvent, type ConversationCreatedEvent } from "~/event/event.types"

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

const toConversationCreatedEvent = (conversation: Conversation): ConversationCreatedEvent => {
	return {
		id: conversation.id,
		organizationId: conversation.organizationId,
		recipient: conversation.recipient,
		createdAt: conversation.createdAt
	}
}

const toConversationUpdatedEvent = (conversation: Conversation): ConversationUpdatedEvent => {
	return {
		id: conversation.id,
		organizationId: conversation.organizationId,
		recipient: conversation.recipient,
		unreadCount: conversation.unreadCount,
		lastMessagePreview: conversation.lastMessagePreview,
		lastMessageAt: conversation.lastMessageAt,
		createdAt: conversation.createdAt,
		updatedAt: conversation.updatedAt
	}
}

export { toConversationCreatedEvent, toConversationDto, toConversationUpdatedEvent }

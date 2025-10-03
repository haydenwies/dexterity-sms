import { type ConversationModel } from "@repo/types/conversation"

import { ConversationUpdatedEvent, type ConversationCreatedEvent } from "~/common/event.types"
import { type Conversation } from "~/conversation/entities/conversation.entity"

// #region DTOs

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
// #endregion

// #region Events

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

// #endregion

export { toConversationCreatedEvent, toConversationDto, toConversationUpdatedEvent }

import { MessageDirection, MessageStatus } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"

enum EVENT_TOPIC {
	CONVERSATION_CREATED = "conversation.created",
	CONVERSATION_UPDATED = "conversation.updated",
	MESSAGE_CREATED = "message.created",
	MESSAGE_UPDATED = "message.updated",
	SENDER_ADDED = "sender.added",
	SENDER_REMOVED = "sender.removed"
}

type ConversationCreatedEvent = {
	id: string
	organizationId: string
	recipient: Phone
	createdAt: Date
}

type ConversationUpdatedEvent = {
	id: string
	organizationId: string
	recipient: Phone
	unreadCount: number
	lastMessagePreview?: string
	lastMessageAt?: Date
	createdAt: Date
	updatedAt: Date
}

type MessageCreatedEvent = {
	messageId: string
	organizationId: string
	conversationId?: string | null
	campaignId?: string | null
	direction: MessageDirection
	from: string
	to: string
	body: string
	createdAt: Date
}

type MessageUpdatedEvent = {
	id: string
	organizationId: string
	conversationId?: string | null
	campaignId?: string | null
	direction: MessageDirection
	status: MessageStatus
	from: string
	to: string
	body: string
	createdAt: Date
	updatedAt: Date
}

type SenderAddedEvent = {
	organizationId: string
	externalId: string
	phone: string
	createdAt: Date
}

type SenderRemovedEvent = {
	organizationId: string
	externalId: string
	phone: string
	removedAt: Date
}

export {
	EVENT_TOPIC,
	type ConversationCreatedEvent,
	type ConversationUpdatedEvent,
	type MessageCreatedEvent,
	type MessageUpdatedEvent,
	type SenderAddedEvent,
	type SenderRemovedEvent
}

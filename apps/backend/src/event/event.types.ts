import { MessageDirection } from "@repo/types/message"
import { Phone } from "~/common/phone.vo"

enum EVENT_TOPIC {
	CONVERSATION_CREATED = "conversation.created",
	CONVERSATION_UPDATED = "conversation.updated",
	MESSAGE_CREATED = "message.created"
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

export { EVENT_TOPIC, type ConversationCreatedEvent, type ConversationUpdatedEvent, type MessageCreatedEvent }

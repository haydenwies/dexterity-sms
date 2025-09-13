import { MessageDirection, MessageStatus } from "./message.enum"

type ConversationModel = {
	id: string
	organizationId: string
	contactId?: string
	recipient: string
	lastMessageAt?: Date
	lastMessagePreview?: string
	unreadCount: number
	createdAt: Date
	updatedAt: Date
}

type MessageModel = {
	id: string
	organizationId: string
	externalId: string | null
	direction: MessageDirection
	status: MessageStatus
	body: string
	from: string
	to: string
	recipient: string // Computed: the conversation participant (to for outbound, from for inbound)
	sentAt?: Date
	deliveredAt?: Date
	readAt?: Date
	createdAt: Date
	updatedAt: Date
}

export type { ConversationModel, MessageModel }

import z from "zod"

// #region enums

enum MessageStatus {
	PENDING = "pending",
	SENT = "sent",
	DELIVERED = "delivered",
	FAILED = "failed",
	RECEIVED = "received",
	READ = "read"
}

enum MessageDirection {
	INBOUND = "inbound",
	OUTBOUND = "outbound"
}

// #endregion

// #region dtos

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

type CreateConversationDto = {
	contactId: string
}

const createConversationDtoSchema = z.object({
	contactId: z.string()
})

type SendMessageDto = {
	conversationId: string
	body: string
}

const sendMessageDtoSchema = z.object({
	conversationId: z.string(),
	body: z.string().min(1, "Message body is required").max(1600, "Message too long")
})

// #endregion

export {
	MessageDirection,
	MessageStatus,
	createConversationDtoSchema,
	sendMessageDtoSchema,
	type ConversationModel,
	type CreateConversationDto,
	type MessageModel,
	type SendMessageDto
}

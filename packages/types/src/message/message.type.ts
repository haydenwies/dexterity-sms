import { MessageDirection, MessageStatus } from "./message.enum"

type MessageModel = {
	id: string
	organizationId: string
	conversationId?: string
	campaignId?: string
	direction: MessageDirection
	status: MessageStatus
	from: string
	to: string
	body: string
	sentAt?: Date
	deliveredAt?: Date
	readAt?: Date
	createdAt: Date
	updatedAt: Date
}

export type { MessageModel }

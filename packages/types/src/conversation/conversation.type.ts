type ConversationModel = {
	id: string
	organizationId: string
	recipient: string
	unreadCount?: number
	lastMessagePreview?: string
	lastMessageAt?: Date
}

export type { ConversationModel }

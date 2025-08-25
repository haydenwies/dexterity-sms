"use server"

import { type ConversationModel } from "@repo/types/message"

const getConversation = async (conversationId: string): Promise<ConversationModel> => {
	const conversation = {
		id: conversationId,
		organizationId: "mock-org",
		contactId: "1",
		recipient: "+1234567890",
		lastMessageAt: new Date(),
		lastMessagePreview: "Hello there!",
		unreadCount: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	}

	return conversation
}

export { getConversation }

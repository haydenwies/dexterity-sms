"use server"

import { type ConversationModel } from "@repo/types/conversation"

const getConversation = async (conversationId: string): Promise<ConversationModel> => {
	const conversation = {
		id: conversationId,
		organizationId: "mock-org",
		recipient: "+1234567890"
	}

	return conversation
}

export { getConversation }

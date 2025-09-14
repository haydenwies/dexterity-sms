import { type ConversationModel } from "@repo/types/conversation"

import { Conversation } from "./conversation.entity"

const toConversationDto = (conversation: Conversation): ConversationModel => {
	return {
		id: conversation.id,
		organizationId: conversation.organizationId,
		recipient: conversation.recipient.value
	}
}

export { toConversationDto }

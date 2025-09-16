import { MessageDirection } from "@repo/types/message"

enum EVENT_TOPIC {
	MESSAGE_CREATED = "message.created"
}

type MessageCreatedEvent = {
	messageId: string
	organizationId: string
	conversationId?: string | null
	campaignId?: string | null
	direction: MessageDirection
	from: string
	to: string
}

export { EVENT_TOPIC, type MessageCreatedEvent }

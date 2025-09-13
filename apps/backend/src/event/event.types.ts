import { MessageDirection } from "@repo/types/message"

export const EVENT_QUEUE = "event-queue"

export enum EVENT_TOPIC {
	MESSAGE_CREATED = "message.created"
}

export type EVENT_PAYLOAD = {
	[EVENT_TOPIC.MESSAGE_CREATED]: {
		messageId: string
		organizationId: string
		from: string
		to: string
		direction: MessageDirection
		campaignId?: string | null
		timestamp: Date
	}
}

export interface MessageCreatedEvent {
	messageId: string
	organizationId: string
	conversationId?: string | null
	campaignId?: string | null
	direction: MessageDirection
	from: string
	to: string
}

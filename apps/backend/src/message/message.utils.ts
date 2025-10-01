import { type MessageModel } from "@repo/types/message"
import { MessageCreatedEvent, MessageUpdatedEvent } from "~/common/event.types"

import { Message } from "~/message/message.entity"

const toMessageDto = (message: Message): MessageModel => {
	return {
		id: message.id,
		organizationId: message.organizationId,
		direction: message.direction,
		status: message.status,
		body: message.body,
		from: message.from.value,
		to: message.to.value,
		sentAt: message.sentAt,
		deliveredAt: message.deliveredAt,
		readAt: message.readAt,
		createdAt: message.createdAt,
		updatedAt: message.updatedAt
	}
}

const toMessageCreatedEvent = (message: Message): MessageCreatedEvent => {
	return {
		messageId: message.id,
		organizationId: message.organizationId,
		conversationId: message.conversationId,
		campaignId: message.campaignId,
		direction: message.direction,
		from: message.from.value,
		to: message.to.value,
		body: message.body,
		createdAt: message.createdAt
	}
}

const toMessageUpdatedEvent = (message: Message): MessageUpdatedEvent => {
	return {
		id: message.id,
		organizationId: message.organizationId,
		conversationId: message.conversationId,
		campaignId: message.campaignId,
		direction: message.direction,
		status: message.status,
		from: message.from.value,
		to: message.to.value,
		body: message.body,
		createdAt: message.createdAt,
		updatedAt: message.updatedAt
	}
}

export { toMessageCreatedEvent, toMessageDto, toMessageUpdatedEvent }

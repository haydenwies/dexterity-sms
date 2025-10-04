import { type MessageModel } from "@repo/types/message"
import { MessageCreatedEvent, MessageUpdatedEvent } from "~/common/event.types"

import { Message } from "~/message/entities/message.entity"

// #region DTOs

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
		createdAt: message.createdAt,
		updatedAt: message.updatedAt
	}
}

// #endregion

// #region Events

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

// #endregion

export { toMessageCreatedEvent, toMessageDto, toMessageUpdatedEvent }

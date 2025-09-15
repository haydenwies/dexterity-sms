import { type MessageModel } from "@repo/types/message"

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

export { toMessageDto }

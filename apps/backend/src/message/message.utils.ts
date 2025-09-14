import { MessageDirection, MessageModel } from "@repo/types/message"

import { Message } from "./message.entity"

const toMessageDto = (message: Message): MessageModel => {
	return {
		id: message.id,
		organizationId: message.organizationId,
		externalId: message.externalId,
		direction: message.direction,
		status: message.status,
		body: message.body,
		from: message.from.value,
		to: message.to.value,
		recipient: message.direction === MessageDirection.OUTBOUND ? message.to.value : message.from.value,
		sentAt: message.sentAt,
		deliveredAt: message.deliveredAt,
		readAt: message.readAt,
		createdAt: message.createdAt,
		updatedAt: message.updatedAt
	}
}

export { toMessageDto }

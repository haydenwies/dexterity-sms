import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { Phone } from "~/common/phone.vo"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { messageTable } from "~/database/database.schema"
import { Message } from "~/message/message.entity"

@Injectable()
class MessageRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string, messageId: string): Promise<Message | undefined> {
		return undefined
	}

	async findMany(organizationId: string, query: { conversationId?: string }): Promise<Message[]> {
		const sql = []
		if (query.conversationId) sql.push(eq(messageTable.conversationId, query.conversationId))

		const messages = await this.db
			.select()
			.from(messageTable)
			.where(and(eq(messageTable.organizationId, organizationId), ...sql))

		return messages.map((row) => MessageRepository.toEntity(row))
	}

	async create(message: Message): Promise<Message> {
		return message
	}

	async update(message: Message): Promise<Message> {
		return message
	}

	private static toEntity(row: typeof messageTable.$inferSelect): Message {
		return new Message({
			id: row.id,
			externalId: row.externalId,
			organizationId: row.organizationId,
			conversationId: row.conversationId,
			campaignId: row.campaignId,
			direction: row.direction,
			status: row.status,
			body: row.body,
			from: Phone.create(row.from),
			to: Phone.create(row.to),
			sentAt: row.sentAt,
			deliveredAt: row.deliveredAt,
			readAt: row.readAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { MessageRepository }

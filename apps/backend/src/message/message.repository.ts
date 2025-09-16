import { Inject, Injectable } from "@nestjs/common"
import { and, count, eq } from "drizzle-orm"

import { MessageStatus } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { messageTable } from "~/database/database.schema"
import { Message } from "~/message/message.entity"

@Injectable()
class MessageRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string, messageId: string): Promise<Message | undefined> {
		const [row] = await this.db
			.select()
			.from(messageTable)
			.where(and(eq(messageTable.organizationId, organizationId), eq(messageTable.id, messageId)))
			.limit(1)
		if (!row) return undefined

		return MessageRepository.toEntity(row)
	}

	async findMany(
		organizationId: string,
		filters: { conversationId?: string; campaignId?: string }
	): Promise<Message[]> {
		const sql = []
		if (filters.conversationId) sql.push(eq(messageTable.conversationId, filters.conversationId))
		if (filters.campaignId) sql.push(eq(messageTable.campaignId, filters.campaignId))

		const messages = await this.db
			.select()
			.from(messageTable)
			.where(and(eq(messageTable.organizationId, organizationId), ...sql))

		return messages.map((row) => MessageRepository.toEntity(row))
	}

	async create(message: Message): Promise<Message> {
		const [row] = await this.db
			.insert(messageTable)
			.values({
				id: message.id,
				organizationId: message.organizationId,
				externalId: message.externalId,
				conversationId: message.conversationId,
				campaignId: message.campaignId,
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
			})
			.returning()
		if (!row) throw new Error("Failed to create message")

		return MessageRepository.toEntity(row)
	}

	async update(message: Message): Promise<Message> {
		const [row] = await this.db
			.update(messageTable)
			.set({
				externalId: message.externalId,
				conversationId: message.conversationId,
				status: message.status,
				sentAt: message.sentAt,
				deliveredAt: message.deliveredAt,
				readAt: message.readAt,
				updatedAt: message.updatedAt
			})
			.where(and(eq(messageTable.organizationId, message.organizationId), eq(messageTable.id, message.id)))
			.returning()
		if (!row) throw new Error("Failed to update message")

		return MessageRepository.toEntity(row)
	}

	async countPending(
		organizationId: string,
		filters?: { conversationId?: string; campaignId?: string }
	): Promise<number> {
		const sql = []
		if (filters?.conversationId) sql.push(eq(messageTable.conversationId, filters.conversationId))
		if (filters?.campaignId) sql.push(eq(messageTable.campaignId, filters.campaignId))

		const [result] = await this.db
			.select({ count: count() })
			.from(messageTable)
			.where(
				and(
					eq(messageTable.organizationId, organizationId),
					eq(messageTable.status, MessageStatus.PENDING),
					...sql
				)
			)

		return result?.count ?? 0
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

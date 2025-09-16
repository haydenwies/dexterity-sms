import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { Phone } from "~/common/phone.vo"
import { Conversation } from "~/conversation/conversation.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { conversationTable } from "~/database/database.schema"

@Injectable()
export class ConversationRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string, conversationId: string): Promise<Conversation | undefined> {
		const [row] = await this.db
			.select()
			.from(conversationTable)
			.where(and(eq(conversationTable.organizationId, organizationId), eq(conversationTable.id, conversationId)))
			.limit(1)
		if (!row) return undefined

		return ConversationRepository.toEntity(row)
	}

	async findByRecipient(organizationId: string, recipient: Phone): Promise<Conversation | undefined> {
		const [row] = await this.db
			.select()
			.from(conversationTable)
			.where(
				and(
					eq(conversationTable.organizationId, organizationId),
					eq(conversationTable.recipient, recipient.value)
				)
			)
			.limit(1)
		if (!row) return undefined

		return ConversationRepository.toEntity(row)
	}

	async findMany(organizationId: string): Promise<Conversation[]> {
		const rows = await this.db
			.select()
			.from(conversationTable)
			.where(eq(conversationTable.organizationId, organizationId))

		return rows.map((row) => ConversationRepository.toEntity(row))
	}

	async create(conversation: Conversation): Promise<Conversation> {
		const [row] = await this.db
			.insert(conversationTable)
			.values({
				id: conversation.id,
				organizationId: conversation.organizationId,
				recipient: conversation.recipient.value,
				unreadCount: conversation.unreadCount,
				lastMessagePreview: conversation.lastMessagePreview,
				lastMessageAt: conversation.lastMessageAt,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning()

		if (!row) throw new Error("Failed to create conversation")

		return ConversationRepository.toEntity(row)
	}

	async update(conversation: Conversation): Promise<Conversation> {
		const [row] = await this.db
			.update(conversationTable)
			.set({
				unreadCount: conversation.unreadCount,
				lastMessagePreview: conversation.lastMessagePreview,
				lastMessageAt: conversation.lastMessageAt,
				updatedAt: conversation.updatedAt
			})
			.where(and(eq(conversationTable.id, conversation.id)))
			.returning()

		if (!row) throw new Error("Failed to update conversation")

		return ConversationRepository.toEntity(row)
	}

	private static toEntity(row: typeof conversationTable.$inferSelect): Conversation {
		return new Conversation({
			id: row.id,
			organizationId: row.organizationId,
			recipient: Phone.create(row.recipient),
			unreadCount: row.unreadCount,
			lastMessagePreview: row.lastMessagePreview,
			lastMessageAt: row.lastMessageAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

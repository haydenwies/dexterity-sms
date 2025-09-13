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

	async create(conversation: Conversation): Promise<Conversation> {
		const [row] = await this.db
			.insert(conversationTable)
			.values({
				id: conversation.id,
				organizationId: conversation.organizationId,
				recipient: conversation.recipient.value,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning()

		if (!row) throw new Error("Failed to create conversation")

		return ConversationRepository.toEntity(row)
	}

	private static toEntity(row: typeof conversationTable.$inferSelect): Conversation {
		return new Conversation({
			id: row.id,
			organizationId: row.organizationId,
			recipient: Phone.create(row.recipient)
		})
	}
}

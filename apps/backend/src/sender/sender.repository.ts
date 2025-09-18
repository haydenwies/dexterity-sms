import { Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"

import { Phone } from "~/common/phone.vo"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { senderTable } from "~/database/database.schema"
import { Sender } from "~/sender/sender.entity"

@Injectable()
class SenderRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string): Promise<Sender | undefined> {
		const [row] = await this.db
			.select()
			.from(senderTable)
			.where(eq(senderTable.organizationId, organizationId))
			.limit(1)
		if (!row) return undefined

		return SenderRepository.toEntity(row)
	}

	async findByPhone(phone: Phone): Promise<Sender | undefined> {
		const [row] = await this.db.select().from(senderTable).where(eq(senderTable.phone, phone.value)).limit(1)
		if (!row) return undefined

		return SenderRepository.toEntity(row)
	}

	async create(sender: Sender): Promise<Sender> {
		if (!sender.organizationId) throw new Error("Organization ID is required to create sender")

		const [row] = await this.db
			.insert(senderTable)
			.values({
				organizationId: sender.organizationId,
				externalId: sender.externalId,
				phone: sender.phone.value,
				createdAt: sender.createdAt
			})
			.returning()
		if (!row) throw new Error("Failed to create sender")

		return SenderRepository.toEntity(row)
	}

	async delete(sender: Sender): Promise<Sender> {
		if (!sender.organizationId) throw new Error("Organization ID is required to delete sender")

		const [row] = await this.db
			.delete(senderTable)
			.where(eq(senderTable.organizationId, sender.organizationId))
			.returning()
		if (!row) throw new Error("Failed to delete sender")

		return SenderRepository.toEntity(row)
	}

	private static toEntity(row: typeof senderTable.$inferSelect): Sender {
		return new Sender({
			organizationId: row.organizationId,
			externalId: row.externalId,
			phone: Phone.create(row.phone),
			createdAt: row.createdAt
		})
	}
}

export { SenderRepository }

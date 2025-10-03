import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { Phone } from "~/common/phone.vo"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { unsubscribeTable } from "~/database/database.schema"
import { Unsubscribe } from "~/unsubscribe/entities/unsubscribe.entity"

@Injectable()
class UnsubscribeRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async findByPhone(organizationId: string, phone: Phone): Promise<Unsubscribe | undefined> {
		const [unsubscribeRecord] = await this.db
			.select()
			.from(unsubscribeTable)
			.where(and(eq(unsubscribeTable.organizationId, organizationId), eq(unsubscribeTable.phone, phone.value)))
			.limit(1)
		if (!unsubscribeRecord) return undefined

		return UnsubscribeRepository.toEntity(unsubscribeRecord)
	}

	async findMany(organizationId: string): Promise<Unsubscribe[]> {
		const unsubscribeRecords = await this.db
			.select()
			.from(unsubscribeTable)
			.where(eq(unsubscribeTable.organizationId, organizationId))

		return unsubscribeRecords.map((record) => UnsubscribeRepository.toEntity(record))
	}

	async create(unsubscribe: Unsubscribe): Promise<Unsubscribe> {
		const [createdUnsubscribe] = await this.db
			.insert(unsubscribeTable)
			.values({
				id: unsubscribe.id,
				organizationId: unsubscribe.organizationId,
				phone: unsubscribe.phone.value,
				unsubscribedAt: unsubscribe.unsubscribedAt,
				createdAt: unsubscribe.createdAt,
				updatedAt: unsubscribe.updatedAt
			})
			.returning()
		if (!createdUnsubscribe) throw new Error("Failed to create unsubscribe record")

		return UnsubscribeRepository.toEntity(createdUnsubscribe)
	}

	async delete(organizationId: string, phone: Phone): Promise<void> {
		await this.db
			.delete(unsubscribeTable)
			.where(and(eq(unsubscribeTable.organizationId, organizationId), eq(unsubscribeTable.phone, phone.value)))
	}

	async exists(organizationId: string, phone: Phone): Promise<boolean> {
		const result = await this.db
			.select()
			.from(unsubscribeTable)
			.where(and(eq(unsubscribeTable.organizationId, organizationId), eq(unsubscribeTable.phone, phone.value)))
			.limit(1)

		return result.length > 0
	}

	private static toEntity(row: typeof unsubscribeTable.$inferSelect): Unsubscribe {
		return new Unsubscribe({
			id: row.id,
			organizationId: row.organizationId,
			phone: Phone.create(row.phone),
			unsubscribedAt: row.unsubscribedAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { UnsubscribeRepository }

import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { Phone } from "~/common/phone.vo"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { unsubscribeTable } from "~/database/database.schema"
import { Unsubscribe } from "~/unsubscribe/unsubscribe.entity"

@Injectable()
class UnsubscribeRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

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

		if (!createdUnsubscribe) {
			throw new Error("Failed to create unsubscribe record")
		}

		return new Unsubscribe({
			id: createdUnsubscribe.id,
			organizationId: createdUnsubscribe.organizationId,
			phone: Phone.create(createdUnsubscribe.phone),
			unsubscribedAt: createdUnsubscribe.unsubscribedAt,
			createdAt: createdUnsubscribe.createdAt,
			updatedAt: createdUnsubscribe.updatedAt
		})
	}

	async findByPhone(organizationId: string, phone: Phone): Promise<Unsubscribe | undefined> {
		const [unsubscribeRecord] = await this.db
			.select()
			.from(unsubscribeTable)
			.where(and(eq(unsubscribeTable.organizationId, organizationId), eq(unsubscribeTable.phone, phone.value)))
			.limit(1)

		if (!unsubscribeRecord) return undefined

		return new Unsubscribe({
			id: unsubscribeRecord.id,
			organizationId: unsubscribeRecord.organizationId,
			phone: Phone.create(unsubscribeRecord.phone),
			unsubscribedAt: unsubscribeRecord.unsubscribedAt,
			createdAt: unsubscribeRecord.createdAt,
			updatedAt: unsubscribeRecord.updatedAt
		})
	}

	async findMany(organizationId: string): Promise<Unsubscribe[]> {
		const unsubscribeRecords = await this.db
			.select()
			.from(unsubscribeTable)
			.where(eq(unsubscribeTable.organizationId, organizationId))

		return unsubscribeRecords.map(
			(record) =>
				new Unsubscribe({
					id: record.id,
					organizationId: record.organizationId,
					phone: Phone.create(record.phone),
					unsubscribedAt: record.unsubscribedAt,
					createdAt: record.createdAt,
					updatedAt: record.updatedAt
				})
		)
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
}

export { UnsubscribeRepository }

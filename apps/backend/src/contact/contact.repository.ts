import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { Contact } from "~/contact/contact.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { contactTable } from "~/database/database.schema"

@Injectable()
class ContactRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async findAll(organizationId: string): Promise<Contact[]> {
		const rows = await this.db.select().from(contactTable).where(eq(contactTable.organizationId, organizationId))

		return rows.map(
			(row) =>
				new Contact({
					id: row.id,
					organizationId: row.organizationId,
					firstName: row.firstName,
					lastName: row.lastName,
					email: row.email,
					phone: row.phone,
					createdAt: row.createdAt,
					updatedAt: row.updatedAt
				})
		)
	}

	async find(organizationId: string, id: string): Promise<Contact | undefined> {
		const [row] = await this.db
			.select()
			.from(contactTable)
			.where(and(eq(contactTable.organizationId, organizationId), eq(contactTable.id, id)))
			.limit(1)
		if (!row) return undefined

		return new Contact({
			id: row.id,
			organizationId: row.organizationId,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			phone: row.phone,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async create(contact: Contact): Promise<Contact> {
		const [row] = await this.db
			.insert(contactTable)
			.values({
				id: contact.id,
				organizationId: contact.organizationId,
				firstName: contact.firstName,
				lastName: contact.lastName,
				email: contact.email,
				phone: contact.phone,
				createdAt: contact.createdAt,
				updatedAt: contact.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create contact")

		return new Contact({
			id: row.id,
			organizationId: row.organizationId,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			phone: row.phone,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async update(contact: Contact): Promise<Contact> {
		const [row] = await this.db
			.update(contactTable)
			.set({
				firstName: contact.firstName,
				lastName: contact.lastName,
				email: contact.email,
				phone: contact.phone,
				updatedAt: contact.updatedAt
			})
			.where(eq(contactTable.id, contact.id))
			.returning()
		if (!row) throw new Error("Failed to update contact")

		return new Contact({
			id: row.id,
			organizationId: row.organizationId,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			phone: row.phone,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { ContactRepository }

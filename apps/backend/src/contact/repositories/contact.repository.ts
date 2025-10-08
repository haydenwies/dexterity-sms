import { Inject, Injectable } from "@nestjs/common"
import { and, eq, inArray } from "drizzle-orm"

import { Email } from "~/common/email.vo"
import { Phone } from "~/common/phone.vo"
import { Contact } from "~/contact/entities/contact.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { contactTable } from "~/database/database.schema"

@Injectable()
class ContactRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async findAll(organizationId: string): Promise<Contact[]> {
		const rows = await this.db.select().from(contactTable).where(eq(contactTable.organizationId, organizationId))

		return rows.map((row) => ContactRepository.toEntity(row))
	}

	async findMany(organizationId: string, contactIds: string[]): Promise<Contact[]> {
		const rows = await this.db
			.select()
			.from(contactTable)
			.where(and(eq(contactTable.organizationId, organizationId), inArray(contactTable.id, contactIds)))
		if (!rows) return []

		return rows.map((row) => ContactRepository.toEntity(row))
	}

	async find(organizationId: string, contactId: string): Promise<Contact | undefined> {
		const [row] = await this.db
			.select()
			.from(contactTable)
			.where(and(eq(contactTable.organizationId, organizationId), eq(contactTable.id, contactId)))
			.limit(1)
		if (!row) return undefined

		return ContactRepository.toEntity(row)
	}

	async create(contact: Contact): Promise<Contact> {
		const [row] = await this.db
			.insert(contactTable)
			.values({
				id: contact.id,
				organizationId: contact.organizationId,
				firstName: contact.firstName,
				lastName: contact.lastName,
				email: contact.email?.value || undefined,
				phone: contact.phone?.value || undefined,
				createdAt: contact.createdAt,
				updatedAt: contact.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create contact")

		return ContactRepository.toEntity(row)
	}

	async createMany(contacts: Contact[]): Promise<Contact[]> {
		const rows = await this.db
			.insert(contactTable)
			.values(
				contacts.map((contact) => ({
					id: contact.id,
					organizationId: contact.organizationId,
					firstName: contact.firstName,
					lastName: contact.lastName,
					email: contact.email?.value || null,
					phone: contact.phone?.value || null,
					createdAt: contact.createdAt,
					updatedAt: contact.updatedAt
				}))
			)
			.returning()
		if (!rows) throw new Error("Failed to create contacts")

		return rows.map((row) => ContactRepository.toEntity(row))
	}

	async update(contact: Contact): Promise<Contact> {
		const [row] = await this.db
			.update(contactTable)
			.set({
				firstName: contact.firstName,
				lastName: contact.lastName,
				email: contact.email?.value || null,
				phone: contact.phone?.value || null,
				updatedAt: contact.updatedAt
			})
			.where(eq(contactTable.id, contact.id))
			.returning()
		if (!row) throw new Error("Failed to update contact")

		return ContactRepository.toEntity(row)
	}

	async deleteMany(contacts: Contact[]): Promise<Contact[]> {
		if (contacts.length === 0) return []

		const contactIds = contacts.map((contact) => contact.id)
		const rows = await this.db.delete(contactTable).where(inArray(contactTable.id, contactIds)).returning()

		return rows.map((row) => ContactRepository.toEntity(row))
	}

	async delete(contact: Contact): Promise<Contact> {
		const [row] = await this.db.delete(contactTable).where(eq(contactTable.id, contact.id)).returning()
		if (!row) throw new Error("Failed to delete contact")

		return ContactRepository.toEntity(row)
	}

	private static toEntity(row: typeof contactTable.$inferSelect): Contact {
		return new Contact({
			id: row.id,
			organizationId: row.organizationId,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email ? Email.create(row.email) : undefined,
			phone: row.phone ? Phone.create(row.phone) : undefined,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { ContactRepository }

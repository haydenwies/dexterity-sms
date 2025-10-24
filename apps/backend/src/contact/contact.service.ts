import { CsvParser } from "@dexterity-sms/csv"
import { Injectable, NotFoundException } from "@nestjs/common"

import {
	type ContactModel,
	type CreateContactDto,
	type DeleteManyContactsDto,
	type UpdateContactDto,
	type UploadContactCsvDto
} from "@dexterity-sms/core/contact"

import { Contact } from "~/contact/entities/contact.entity"
import { ContactRepository } from "~/contact/repositories/contact.repository"

@Injectable()
class ContactService {
	constructor(private readonly contactRepository: ContactRepository) {}

	async getAll(organizationId: string): Promise<Contact[]> {
		return this.contactRepository.findAll(organizationId)
	}

	async get(organizationId: string, id: string): Promise<Contact> {
		const contact = await this.contactRepository.find(organizationId, id)
		if (!contact) throw new NotFoundException("Contact not found")

		return contact
	}

	async create(organizationId: string, dto: CreateContactDto): Promise<void> {
		const contact = Contact.create({
			organizationId,
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			phone: dto.phone
		})
		await this.contactRepository.create(contact)
	}

	async createFromCsv(organizationId: string, file: Express.Multer.File, dto: UploadContactCsvDto): Promise<void> {
		// Parse CSV file
		const fileString = file.buffer.toString()
		const parser = new CsvParser()
		await parser.parseFromString(fileString)

		// Create contacts from column mappings
		const contacts = []
		for (const dataRow of parser.data) {
			const contact = Contact.safeCreate({
				organizationId,
				firstName: dto.firstName ? dataRow[dto.firstName] : undefined,
				lastName: dto.lastName ? dataRow[dto.lastName] : undefined,
				email: dto.email ? dataRow[dto.email] : undefined,
				phone: dto.phone ? dataRow[dto.phone] : undefined
			})

			if (contact) contacts.push(contact)
		}

		await this.contactRepository.createMany(contacts)
	}

	async update(organizationId: string, id: string, dto: UpdateContactDto): Promise<void> {
		const contact = await this.contactRepository.find(organizationId, id)
		if (!contact) throw new NotFoundException("Contact not found")

		contact.update({
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			phone: dto.phone
		})
		await this.contactRepository.update(contact)
	}

	async deleteMany(organizationId: string, dto: DeleteManyContactsDto): Promise<void> {
		const contacts = await this.contactRepository.findMany(organizationId, dto.ids)
		if (!contacts) throw new NotFoundException("Contacts not found")

		await this.contactRepository.deleteMany(contacts)
	}

	async delete(organizationId: string, id: string): Promise<void> {
		const contact = await this.contactRepository.find(organizationId, id)
		if (!contact) throw new NotFoundException("Contact not found")

		await this.contactRepository.delete(contact)
	}

	deduplicateByPhone(contacts: Contact[]): Contact[] {
		const phoneValues = new Set<string>()
		const deduplicatedContacts = []

		for (const contact of contacts) {
			if (contact.phone && !phoneValues.has(contact.phone.value)) {
				phoneValues.add(contact.phone.value)
				deduplicatedContacts.push(contact)
			}
		}

		return deduplicatedContacts
	}

	toDto(contact: Contact): ContactModel {
		return {
			id: contact.id,
			organizationId: contact.organizationId,
			tagIds: [],
			firstName: contact.firstName,
			lastName: contact.lastName,
			email: contact.email?.value || undefined,
			phone: contact.phone?.value || undefined,
			createdAt: contact.createdAt,
			updatedAt: contact.updatedAt
		}
	}
}

export { ContactService }

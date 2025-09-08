import { Injectable, NotFoundException } from "@nestjs/common"

import { ContactModel } from "@repo/types/contact"
import { CreateContactDto } from "@repo/types/contact/dto/create-contact"
import { DeleteManyContactsDto } from "@repo/types/contact/dto/delete-many-contacts"
import { UpdateContactDto } from "@repo/types/contact/dto/update-contact"

import { Contact } from "~/contact/contact.entity"
import { ContactRepository } from "~/contact/contact.repository"

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

	toDto(contact: Contact): ContactModel {
		return {
			id: contact.id,
			organizationId: contact.organizationId,
			tagIds: [],
			firstName: contact.firstName,
			lastName: contact.lastName,
			email: contact.email,
			phone: contact.phone,
			createdAt: contact.createdAt,
			updatedAt: contact.updatedAt
		}
	}
}

export { ContactService }

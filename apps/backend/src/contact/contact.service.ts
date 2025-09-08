import { Injectable, NotFoundException } from "@nestjs/common"

import { ContactModel } from "@repo/types/contact"
import { CreateContactDto } from "@repo/types/contact/dto/create-contact"
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

	async create(organizationId: string, dto: CreateContactDto): Promise<Contact> {
		const contact = Contact.create({
			organizationId,
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			phone: dto.phone
		})
		const createdContact = await this.contactRepository.create(contact)

		return createdContact
	}

	async update(organizationId: string, id: string, dto: UpdateContactDto): Promise<Contact> {
		const contact = await this.contactRepository.find(organizationId, id)
		if (!contact) throw new NotFoundException("Contact not found")

		contact.update({
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			phone: dto.phone
		})
		const updatedContact = await this.contactRepository.update(contact)

		return updatedContact
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

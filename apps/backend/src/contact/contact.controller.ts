import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common"

import { ContactModel } from "@repo/types/contact"
import { createContactDtoSchema, type CreateContactDto } from "@repo/types/contact/dto/create-contact"
import { updateContactDtoSchema, type UpdateContactDto } from "@repo/types/contact/dto/update-contact"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { ContactService } from "~/contact/contact.service"

@UseGuards(AuthGuard)
@Controller("organizations/:organizationId/contacts")
class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Get()
	async getAll(@Param("organizationId") organizationId: string): Promise<ContactModel[]> {
		const contacts = await this.contactService.getAll(organizationId)

		return contacts.map(this.contactService.toDto)
	}

	@Get(":id")
	async get(@Param("organizationId") organizationId: string, @Param("id") id: string): Promise<ContactModel> {
		const contact = await this.contactService.get(organizationId, id)

		return this.contactService.toDto(contact)
	}

	@Post()
	async create(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createContactDtoSchema)) body: CreateContactDto
	): Promise<ContactModel> {
		const contact = await this.contactService.create(organizationId, body)

		return this.contactService.toDto(contact)
	}

	@Put(":id")
	async update(
		@Param("organizationId") organizationId: string,
		@Param("id") id: string,
		@Body(new ZodValidationPipe(updateContactDtoSchema)) body: UpdateContactDto
	): Promise<ContactModel> {
		const contact = await this.contactService.update(organizationId, id, body)

		return this.contactService.toDto(contact)
	}
}

export { ContactController }

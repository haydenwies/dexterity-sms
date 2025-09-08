import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common"

import { type ContactModel } from "@repo/types/contact"
import { createContactDtoSchema, type CreateContactDto } from "@repo/types/contact/dto/create-contact"
import { deleteManyContactsDtoSchema, type DeleteManyContactsDto } from "@repo/types/contact/dto/delete-many-contacts"
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
	@HttpCode(HttpStatus.NO_CONTENT)
	async create(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createContactDtoSchema)) body: CreateContactDto
	): Promise<void> {
		await this.contactService.create(organizationId, body)
	}

	@Put(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async update(
		@Param("organizationId") organizationId: string,
		@Param("id") id: string,
		@Body(new ZodValidationPipe(updateContactDtoSchema)) body: UpdateContactDto
	): Promise<void> {
		await this.contactService.update(organizationId, id, body)
	}

	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteMany(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(deleteManyContactsDtoSchema)) body: DeleteManyContactsDto
	): Promise<void> {
		await this.contactService.deleteMany(organizationId, body)
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param("organizationId") organizationId: string, @Param("id") id: string): Promise<void> {
		await this.contactService.delete(organizationId, id)
	}
}

export { ContactController }

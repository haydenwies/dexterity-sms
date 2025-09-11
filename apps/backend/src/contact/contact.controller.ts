import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

import { type ContactModel } from "@repo/types/contact"
import {
	createContactDtoSchema,
	deleteManyContactsDtoSchema,
	updateContactDtoSchema,
	uploadContactCsvDtoSchema,
	type CreateContactDto,
	type DeleteManyContactsDto,
	type UpdateContactDto,
	type UploadContactCsvDto
} from "@repo/types/contact/dto"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { ContactService } from "~/contact/contact.service"
import { OrganizationGuard } from "~/organization/organization.guard"

@UseGuards(AuthGuard, OrganizationGuard)
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
	): Promise<void> {
		await this.contactService.create(organizationId, body)
	}

	@Post("csv")
	@UseInterceptors(FileInterceptor("file"))
	async createFromCsv(
		@Param("organizationId") organizationId: string,
		@UploadedFile() file: Express.Multer.File,
		@Body(new ZodValidationPipe(uploadContactCsvDtoSchema)) body: UploadContactCsvDto
	): Promise<void> {
		await this.contactService.createFromCsv(organizationId, file, body)
	}

	@Put(":id")
	async update(
		@Param("organizationId") organizationId: string,
		@Param("id") id: string,
		@Body(new ZodValidationPipe(updateContactDtoSchema)) body: UpdateContactDto
	): Promise<void> {
		await this.contactService.update(organizationId, id, body)
	}

	@Delete()
	async deleteMany(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(deleteManyContactsDtoSchema)) body: DeleteManyContactsDto
	): Promise<void> {
		await this.contactService.deleteMany(organizationId, body)
	}

	@Delete(":id")
	async delete(@Param("organizationId") organizationId: string, @Param("id") id: string): Promise<void> {
		await this.contactService.delete(organizationId, id)
	}
}

export { ContactController }

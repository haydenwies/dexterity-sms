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

import {
	createContactDtoSchema,
	deleteManyContactsDtoSchema,
	updateContactDtoSchema,
	uploadContactCsvDtoSchema,
	type ContactModel,
	type CreateContactDto,
	type DeleteManyContactsDto,
	type UpdateContactDto,
	type UploadContactCsvDto
} from "@repo/types/contact"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { ContactService } from "~/contact/contact.service"
import { MemberGuard } from "~/organization/guards/member.guard"

@UseGuards(AuthGuard, MemberGuard)
@Controller("organizations/:organizationId/contacts")
class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Get()
	async getAll(@Param("organizationId") organizationId: string): Promise<ContactModel[]> {
		console.log("[CACHE CHECK] getAll - Getting contacts")
		const contacts = await this.contactService.getAll(organizationId)

		return contacts.map(this.contactService.toDto)
	}

	@Post()
	async create(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createContactDtoSchema)) body: CreateContactDto
	): Promise<void> {
		await this.contactService.create(organizationId, body)
	}

	@Delete()
	async deleteMany(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(deleteManyContactsDtoSchema)) body: DeleteManyContactsDto
	): Promise<void> {
		await this.contactService.deleteMany(organizationId, body)
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

	@Get(":contactId")
	async get(
		@Param("organizationId") organizationId: string,
		@Param("contactId") contactId: string
	): Promise<ContactModel> {
		const contact = await this.contactService.get(organizationId, contactId)

		return this.contactService.toDto(contact)
	}

	@Put(":contactId")
	async update(
		@Param("organizationId") organizationId: string,
		@Param("contactId") contactId: string,
		@Body(new ZodValidationPipe(updateContactDtoSchema)) body: UpdateContactDto
	): Promise<void> {
		await this.contactService.update(organizationId, contactId, body)
	}

	@Delete(":contactId")
	async delete(
		@Param("organizationId") organizationId: string,
		@Param("contactId") contactId: string
	): Promise<void> {
		await this.contactService.delete(organizationId, contactId)
	}
}

export { ContactController }

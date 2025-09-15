import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common"

import {
	createOrganizationDtoSchema,
	updateOrganizationDtoSchema,
	type CreateOrganizationDto,
	type OrganizationModel,
	type UpdateOrganizationDto
} from "@repo/types/organization"

import { User } from "~/auth/auth.decorator"
import { AuthGuard } from "~/auth/auth.guard"
import { User as UserEntity } from "~/auth/user/user.entity"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { OrganizationService } from "~/organization/organization.service"

@UseGuards(AuthGuard)
@Controller("organizations")
class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	@Get()
	async getAll(@User() user: UserEntity): Promise<OrganizationModel[]> {
		const organizations = await this.organizationService.getAll(user.id)

		return organizations.map(this.organizationService.toDto)
	}

	@Get(":id")
	async get(@User() user: UserEntity, @Param("id") id: string): Promise<OrganizationModel> {
		const organization = await this.organizationService.get(user.id, id)

		return this.organizationService.toDto(organization)
	}

	@Post()
	async create(
		@User() user: UserEntity,
		@Body(new ZodValidationPipe(createOrganizationDtoSchema)) body: CreateOrganizationDto
	): Promise<OrganizationModel> {
		const organization = await this.organizationService.create(user.id, body)

		return this.organizationService.toDto(organization)
	}

	@Put(":id")
	async update(
		@User() user: UserEntity,
		@Param("id") id: string,
		@Body(new ZodValidationPipe(updateOrganizationDtoSchema)) body: UpdateOrganizationDto
	): Promise<OrganizationModel> {
		const organization = await this.organizationService.update(user.id, id, body)

		return this.organizationService.toDto(organization)
	}
}

export { OrganizationController }

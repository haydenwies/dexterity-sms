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
import { MemberGuard } from "~/organization/guards/member.guard"
import { OrganizationService } from "~/organization/organization.service"
import { toOrganizationDto } from "~/organization/organization.utils"

@UseGuards(AuthGuard)
@Controller("organizations")
class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	@Get()
	async getMany(@User() user: UserEntity): Promise<OrganizationModel[]> {
		const organizations = await this.organizationService.getMany(user.id)

		return organizations.map((organization) => toOrganizationDto(organization))
	}

	@Post()
	async create(
		@User() user: UserEntity,
		@Body(new ZodValidationPipe(createOrganizationDtoSchema)) body: CreateOrganizationDto
	): Promise<OrganizationModel> {
		const organization = await this.organizationService.create(user.id, body)

		return toOrganizationDto(organization)
	}

	@UseGuards(MemberGuard)
	@Get(":organizationId")
	async get(@User() user: UserEntity, @Param("organizationId") organizationId: string): Promise<OrganizationModel> {
		const organization = await this.organizationService.get(user.id, organizationId)

		return toOrganizationDto(organization)
	}

	@UseGuards(MemberGuard)
	@Put(":organizationId")
	async update(
		@User() user: UserEntity,
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(updateOrganizationDtoSchema)) body: UpdateOrganizationDto
	): Promise<OrganizationModel> {
		const organization = await this.organizationService.update(user.id, organizationId, body)

		return toOrganizationDto(organization)
	}
}

export { OrganizationController }

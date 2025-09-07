import { Injectable, NotFoundException } from "@nestjs/common"

import { type OrganizationModel } from "@repo/types/organization"
import { type CreateOrganizationDto } from "@repo/types/organization/dto/create-organization"
import { type UpdateOrganizationDto } from "@repo/types/organization/dto/update-organization"

import { OrganizationUserService } from "~/organization/organization-user/organization-user.service"
import { Organization } from "~/organization/organization.entity"
import { OrganizationRepository } from "~/organization/organization.repository"

@Injectable()
class OrganizationService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly organizationUserService: OrganizationUserService
	) {}

	async getAll(userId: string): Promise<Organization[]> {
		// Get all organization users
		const organizationUsers = await this.organizationUserService.getAllByUserId(userId)
		const organizationIds = organizationUsers.map((organizationUser) => organizationUser.organizationId)
		if (organizationIds.length === 0) return []

		// Get all organizations
		const organizations = await this.organizationRepository.findAll(organizationIds)

		return organizations
	}

	async get(userId: string, id: string): Promise<Organization> {
		// Get organization user
		const organizationUser = await this.organizationUserService.get(userId, id)

		// Get organization
		const organization = await this.organizationRepository.find(organizationUser.organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async create(userId: string, dto: CreateOrganizationDto): Promise<Organization> {
		// Create organization
		const organization = Organization.create({ name: dto.name })
		const createdOrganization = await this.organizationRepository.create(organization)

		// Create organization user
		await this.organizationUserService.create(userId, createdOrganization.id)

		return createdOrganization
	}

	async update(userId: string, id: string, dto: UpdateOrganizationDto): Promise<Organization> {
		// Get organization user
		const organizationUser = await this.organizationUserService.get(userId, id)

		// Get organization
		const organization = await this.organizationRepository.find(organizationUser.organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		// Update organization
		organization.update({ name: dto.name })
		const updatedOrganization = await this.organizationRepository.update(organization)

		return updatedOrganization
	}

	toDto(organization: Organization): OrganizationModel {
		return {
			id: organization.id,
			name: organization.name,
			billingAccountId: undefined, // TODO: Remove this from DTO
			createdAt: organization.createdAt,
			updatedAt: organization.updatedAt
		}
	}
}

export { OrganizationService }

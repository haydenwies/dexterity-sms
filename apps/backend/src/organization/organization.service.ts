import { Injectable, NotFoundException } from "@nestjs/common"

import { type CreateOrganizationDto, type UpdateOrganizationDto } from "@repo/types/organization"

import { MemberService } from "~/organization/member/member.service"
import { Organization } from "~/organization/organization.entity"
import { OrganizationRepository } from "~/organization/organization.repository"

@Injectable()
class OrganizationService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly memberService: MemberService
	) {}

	async getMany(userId: string): Promise<Organization[]> {
		// Get all organization users
		const members = await this.memberService.getAllByUserId(userId)
		const organizationIds = members.map((member) => member.organizationId)
		if (organizationIds.length === 0) return []

		// Get all organizations
		const organizations = await this.organizationRepository.findAll(organizationIds)

		return organizations
	}

	async get(userId: string, id: string): Promise<Organization> {
		// Get organization user
		const member = await this.memberService.get(userId, id)

		// Get organization
		const organization = await this.organizationRepository.find(member.organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async create(userId: string, dto: CreateOrganizationDto): Promise<Organization> {
		// Create organization
		const organization = Organization.create({ name: dto.name })
		const createdOrganization = await this.organizationRepository.create(organization)

		// Create organization user
		await this.memberService.create(userId, createdOrganization.id)

		return createdOrganization
	}

	async update(userId: string, id: string, dto: UpdateOrganizationDto): Promise<Organization> {
		// Get organization user
		const member = await this.memberService.get(userId, id)

		// Get organization
		const organization = await this.organizationRepository.find(member.organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		// Update organization
		organization.update({ name: dto.name })
		const updatedOrganization = await this.organizationRepository.update(organization)

		return updatedOrganization
	}
}

export { OrganizationService }

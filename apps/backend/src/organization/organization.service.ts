import { Injectable, NotFoundException } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import { type CreateOrganizationDto, type UpdateOrganizationDto } from "@repo/types/organization"

import { Event } from "~/event/event.types"
import { MemberService } from "~/organization/member/member.service"
import { Organization } from "~/organization/organization.entity"
import { OrganizationRepository } from "~/organization/organization.repository"
import { toOrganizationUpdatedEvent } from "~/organization/organization.utils"

@Injectable()
class OrganizationService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly memberService: MemberService,
		private readonly eventEmitter: EventEmitter2
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

	async getById(id: string): Promise<Organization> {
		const organization = await this.organizationRepository.find(id)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async get(userId: string, id: string): Promise<Organization> {
		// Get organization user
		const member = await this.memberService.get(userId, id)

		// Get organization
		const organization = await this.organizationRepository.find(member.organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async getByExternalBillingAccountId(externalBillingAccountId: string): Promise<Organization> {
		const organization = await this.organizationRepository.findByExternalBillingAccountId(externalBillingAccountId)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async create(userId: string, dto: CreateOrganizationDto): Promise<Organization> {
		// Create organization
		const organization = Organization.create({
			name: dto.name,
			email: dto.email
		})
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
		organization.update({
			name: dto.name,
			email: dto.email
		})
		const updatedOrganization = await this.organizationRepository.update(organization)

		// Emit organization updated event
		await this.eventEmitter.emitAsync(Event.ORGANIZATION_UPDATED, toOrganizationUpdatedEvent(updatedOrganization))

		return updatedOrganization
	}

	async updateExternalBillingAccountId(
		organizationId: string,
		externalBillingAccountId: string
	): Promise<Organization> {
		// Get organization
		const organization = await this.organizationRepository.find(organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		// Update organization
		organization.updateExternalBillingAccountId(externalBillingAccountId)
		const updatedOrganization = await this.organizationRepository.update(organization)

		// Skip emitting organization updated event for security

		return updatedOrganization
	}
}

export { OrganizationService }

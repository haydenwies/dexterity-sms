import { Injectable, NotFoundException } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import { type CreateOrganizationDto, type UpdateOrganizationDto } from "@repo/types/organization"

import { Event } from "~/common/event.types"
import { Member } from "~/organization/entities/member.entity"
import { Organization } from "~/organization/entities/organization.entity"
import { toOrganizationCreatedEvent, toOrganizationUpdatedEvent } from "~/organization/organization.utils"
import { MemberRepository } from "~/organization/repositories/member.repository"
import { OrganizationRepository } from "~/organization/repositories/organization.repository"

@Injectable()
class OrganizationService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly memberRepository: MemberRepository,
		private readonly eventEmitter: EventEmitter2
	) {}

	async get(userId: string, id: string): Promise<Organization> {
		// Get organization user
		const member = await this.memberRepository.find(userId, id)
		if (!member) throw new NotFoundException("Organization user not found")

		// Get organization
		const organization = await this.organizationRepository.find(member.organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async getById(id: string): Promise<Organization> {
		const organization = await this.organizationRepository.find(id)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async getByExternalBillingId(externalBillingId: string): Promise<Organization> {
		const organization = await this.organizationRepository.findByExternalBillingId(externalBillingId)
		if (!organization) throw new NotFoundException("Organization not found")

		return organization
	}

	async getMany(userId: string): Promise<Organization[]> {
		// Get all organization users
		const members = await this.memberRepository.findAllByUserId(userId)
		const organizationIds = members.map((member) => member.organizationId)
		if (organizationIds.length === 0) return []

		// Get all organizations
		const organizations = await this.organizationRepository.findAll(organizationIds)

		return organizations
	}

	async create(userId: string, dto: CreateOrganizationDto): Promise<Organization> {
		// Create organization
		const organization = Organization.create({
			name: dto.name,
			email: dto.email
		})
		const createdOrganization = await this.organizationRepository.create(organization)

		// Create organization user
		const member = Member.create({
			userId,
			organizationId: createdOrganization.id
		})
		await this.memberRepository.create(member)

		// Emit organization created event
		await this.eventEmitter.emitAsync(Event.ORGANIZATION_CREATED, toOrganizationCreatedEvent(createdOrganization))

		return createdOrganization
	}

	async update(userId: string, id: string, dto: UpdateOrganizationDto): Promise<Organization> {
		// Get organization user
		const member = await this.memberRepository.find(userId, id)
		if (!member) throw new NotFoundException("Organization user not found")

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

	async updateExternalBillingId(organizationId: string, externalBillingAccountId: string): Promise<Organization> {
		// Get organization
		const organization = await this.organizationRepository.find(organizationId)
		if (!organization) throw new NotFoundException("Organization not found")

		// Update organization
		organization.updateExternalBillingId(externalBillingAccountId)
		const updatedOrganization = await this.organizationRepository.update(organization)

		// Skip emitting organization updated event for security

		return updatedOrganization
	}

	async safeGetMember(userId: string, organizationId: string): Promise<Member | undefined> {
		const member = await this.memberRepository.find(userId, organizationId)
		if (!member) return undefined

		return member
	}
}

export { OrganizationService }

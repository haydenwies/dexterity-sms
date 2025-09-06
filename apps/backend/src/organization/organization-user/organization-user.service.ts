import { Injectable, NotFoundException } from "@nestjs/common"

import { OrganizationUser } from "~/organization/organization-user/organization-user.entity"
import { OrganizationUserRepository } from "~/organization/organization-user/organization-user.repository"

@Injectable()
class OrganizationUserService {
	constructor(private readonly organizationUserRepository: OrganizationUserRepository) {}

	async getAllByUserId(userId: string): Promise<OrganizationUser[]> {
		const organizationUsers = await this.organizationUserRepository.findAllByUserId(userId)

		return organizationUsers
	}

	async get(userId: string, organizationId: string): Promise<OrganizationUser> {
		const organizationUser = await this.organizationUserRepository.find(userId, organizationId)
		if (!organizationUser) throw new NotFoundException("Organization user not found")

		return organizationUser
	}

	async create(userId: string, organizationId: string): Promise<OrganizationUser> {
		const organizationUser = OrganizationUser.create({ userId, organizationId })
		const createdOrganizationUser = await this.organizationUserRepository.create(organizationUser)

		return createdOrganizationUser
	}
}

export { OrganizationUserService }

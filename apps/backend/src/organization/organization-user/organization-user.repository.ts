import { Injectable } from "@nestjs/common"

import { OrganizationUser } from "~/organization/organization-user/organization-user.entity"

@Injectable()
class OrganizationUserRepository {
	async find(userId: string, organizationId: string): Promise<OrganizationUser | undefined> {
		return undefined
	}

	async findAllByUserId(userId: string): Promise<OrganizationUser[]> {
		return []
	}

	async create(organizationUser: OrganizationUser): Promise<OrganizationUser> {
		return organizationUser
	}
}

export { OrganizationUserRepository }

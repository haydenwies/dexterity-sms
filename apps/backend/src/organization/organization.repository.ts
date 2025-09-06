import { Injectable } from "@nestjs/common"

import { Organization } from "~/organization/organization.entity"

@Injectable()
class OrganizationRepository {
	async find(id: string): Promise<Organization | undefined> {
		return undefined
	}

	async findAll(ids: string[]): Promise<Organization[]> {
		return []
	}

	async create(organization: Organization): Promise<Organization> {
		return organization
	}

	async update(organization: Organization): Promise<Organization> {
		return organization
	}
}

export { OrganizationRepository }

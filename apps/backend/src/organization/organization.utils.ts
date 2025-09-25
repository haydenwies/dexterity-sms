import { OrganizationModel } from "@repo/types/organization"

import { Organization } from "~/organization/organization.entity"

const toOrganizationDto = (organization: Organization): OrganizationModel => {
	return {
		id: organization.id,
		name: organization.name,
		email: organization.email,
		createdAt: organization.createdAt,
		updatedAt: organization.updatedAt
	}
}

export { toOrganizationDto }

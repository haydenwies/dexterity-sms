import { OrganizationModel } from "@repo/types/organization"

import { Organization } from "~/organization/organization.entity"

const toOrganizationDto = (organization: Organization): OrganizationModel => {
	return {
		id: organization.id,
		name: organization.name,
		billingAccountId: undefined, // TODO: Remove this from DTO
		createdAt: organization.createdAt,
		updatedAt: organization.updatedAt
	}
}

export { toOrganizationDto }

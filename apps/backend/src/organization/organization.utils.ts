import { OrganizationModel } from "@repo/types/organization"

import { type OrganizationUpdatedEvent } from "~/event/event.types"
import { type Organization } from "~/organization/organization.entity"

// #region DTOs

const toOrganizationDto = (organization: Organization): OrganizationModel => {
	return {
		id: organization.id,
		name: organization.name,
		email: organization.email,
		createdAt: organization.createdAt,
		updatedAt: organization.updatedAt
	}
}

// #endregion

// #region Events

const toOrganizationUpdatedEvent = (organization: Organization): OrganizationUpdatedEvent => {
	return {
		id: organization.id,
		externalBillingId: organization.externalBillingAccountId,
		name: organization.name,
		email: organization.email,
		createdAt: organization.createdAt,
		updatedAt: organization.updatedAt
	}
}

// #endregion

export { toOrganizationDto, toOrganizationUpdatedEvent }

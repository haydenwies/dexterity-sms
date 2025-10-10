import { type OrganizationModel } from "@repo/types/organization"

import { OrganizationCreatedEvent, type OrganizationUpdatedEvent } from "~/common/event.types"
import { type Organization } from "~/organization/entities/organization.entity"

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

const toOrganizationCreatedEvent = (organization: Organization): OrganizationCreatedEvent => {
	return {
		id: organization.id,
		externalBillingId: organization.externalBillingId,
		name: organization.name,
		email: organization.email,
		createdAt: organization.createdAt,
		updatedAt: organization.updatedAt
	}
}

const toOrganizationUpdatedEvent = (organization: Organization): OrganizationUpdatedEvent => {
	return {
		id: organization.id,
		externalBillingId: organization.externalBillingId,
		name: organization.name,
		email: organization.email,
		createdAt: organization.createdAt,
		updatedAt: organization.updatedAt
	}
}

// #endregion

export { toOrganizationCreatedEvent, toOrganizationDto, toOrganizationUpdatedEvent }

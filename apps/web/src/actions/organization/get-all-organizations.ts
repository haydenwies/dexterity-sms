"use server"

import { OrganizationModel } from "@repo/types/organization"

const getAllOrganizations = async (): Promise<OrganizationModel[]> => {
	return [
		{
			id: "1",
			name: "Organization 1",
			billingAccountId: "1",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "2",
			name: "Organization 2",
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllOrganizations }

"use server"

import { OrganizationModel } from "@repo/types/organization"

const getAllOrganizations = async (): Promise<OrganizationModel[]> => {
	return [
		{
			id: "1",
			name: "Organization 1"
		},
		{
			id: "2",
			name: "Organization 2"
		}
	]
}

export { getAllOrganizations }

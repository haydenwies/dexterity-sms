"use server"

import { OrganizationModel } from "@repo/types/organization"

const getOrganization = async (organizationId: string): Promise<OrganizationModel> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(organizationId)

	return {
		id: "123",
		name: "Test Organization",
		billingAccountId: "1",
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

export { getOrganization }

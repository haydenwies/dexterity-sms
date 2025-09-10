"use server"

import { routes } from "@repo/routes"
import { type UpdateOrganizationDto } from "@repo/types/organization/dto"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const updateOrganization = async (organizationId: string, dto: UpdateOrganizationDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.UPDATE_ORGANIZATION(organizationId)}`, {
		method: "PUT",
		body: JSON.stringify(dto),
		headers: {
			"Authorization": `Bearer ${sessionToken}`,
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}
}

export { updateOrganization }

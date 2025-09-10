"use server"

import { routes } from "@repo/routes"
import { UpdateOrganizationDto } from "@repo/types/organization/dto/update-organization"
import { getBackendUrl } from "~/lib/backend"
import { sessionMiddleware } from "../utils"

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

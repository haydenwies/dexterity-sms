import "server-only"

import { routes } from "@repo/routes"
import { type OrganizationModel } from "@repo/types/organization"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyOrganizations = async (): Promise<OrganizationModel[]> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_ALL_ORGANIZATIONS}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyOrganizations }

import "server-only"

import { routes } from "@repo/routes"
import { type OrganizationModel } from "@repo/types/organization"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getOrganization = async (organizationId: string): Promise<OrganizationModel> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_ORGANIZATION(organizationId)}`, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		cache: "no-store"
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getOrganization }

import "server-only"

import { type OrganizationModel } from "@dexterity-sms/core/organization"
import { routes } from "@dexterity-sms/routes"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getOrganization = async (organizationId: string): Promise<OrganizationModel> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_ORGANIZATION(organizationId)}`
	const res = await fetch(url, {
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

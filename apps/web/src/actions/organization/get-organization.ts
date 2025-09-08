"use server"

import { routes } from "@repo/routes"
import { OrganizationModel } from "@repo/types/organization"

import { actionError, actionSuccess, type ActionResponse } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, getCookie } from "~/lib/cookies"

const getOrganization = async (organizationId: string): Promise<ActionResponse<OrganizationModel>> => {
	const backendUrl = getBackendUrl()
	const sessionToken = await getCookie(Cookie.SESSION_TOKEN)
	if (!sessionToken) return actionError("Session token not found")

	const res = await fetch(`${backendUrl}${routes.backend.GET_ORGANIZATION(organizationId)}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		return actionError(errData.message)
	}

	const data = await res.json()

	return actionSuccess(data)
}

export { getOrganization }

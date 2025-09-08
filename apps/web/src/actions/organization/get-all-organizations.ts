"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { OrganizationModel } from "@repo/types/organization"

import { getBackendUrl } from "~/lib/backend"
import { Cookie, getCookie } from "~/lib/cookies"

const getAllOrganizations = async (): Promise<OrganizationModel[]> => {
	const backendUrl = getBackendUrl()
	const sessionToken = await getCookie(Cookie.SESSION_TOKEN)
	if (!sessionToken) return redirect(routes.web.SIGN_IN)

	const res = await fetch(`${backendUrl}${routes.backend.GET_ALL_ORGANIZATIONS}`, {
		method: "POST",
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

export { getAllOrganizations }

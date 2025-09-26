"use server"

import { routes } from "@repo/routes"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl, getFrontendUrl } from "~/lib/backend"

const getCheckoutSession = async (organizationId: string): Promise<{ url: string }> => {
	const sessionToken = await sessionMiddleware()

	const callbackUrl = `${getFrontendUrl()}${routes.web.SETTINGS(organizationId)}`
	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_CHECKOUT_SESSION(organizationId, { callbackUrl })}`, {
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

export { getCheckoutSession }

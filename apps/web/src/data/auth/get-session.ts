import "server-only"

import { routes } from "@repo/routes"
import { type SessionDto } from "@repo/types/auth"

import { safeSessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/url"

const getSession = async (): Promise<SessionDto | undefined> => {
	const sessionToken = await safeSessionMiddleware()
	if (!sessionToken) return undefined

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_SESSION}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		if (res.status === 404) return undefined

		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getSession }

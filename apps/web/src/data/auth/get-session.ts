import "server-only"

import { routes } from "@repo/routes"
import { type SessionDto } from "@repo/types/auth"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getSession = async (): Promise<SessionDto | undefined> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) return undefined

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_SESSION}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		},
		cache: "no-store"
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

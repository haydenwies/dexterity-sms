import "server-only"

import { type SessionDto } from "@dexterity-sms/core/auth"
import { routes } from "@dexterity-sms/routes"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getSession = async (): Promise<SessionDto | undefined> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) return undefined

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_SESSION}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
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

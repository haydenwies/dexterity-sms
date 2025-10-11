import "server-only"

import { routes } from "@repo/routes"
import { SESSION_COOKIE, type UserDto } from "@repo/types/auth"

import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const getUser = async (): Promise<UserDto> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_USER}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		},
		cache: "no-store"
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getUser }

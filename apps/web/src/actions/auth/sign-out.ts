"use server"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, deleteCookie, getCookie } from "~/lib/cookies"

const signOut = async (): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()
	const sessionToken = await getCookie(Cookie.SESSION_TOKEN)
	if (!sessionToken) return actionError("Session token not found")

	const res = await fetch(`${backendUrl}/auth/sign-out`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		return actionError(errData.message)
	}

	await deleteCookie(Cookie.SESSION_TOKEN)

	return actionSuccess(undefined)
}

export { signOut }

"use server"

import { routes } from "@repo/routes"
import { redirect } from "next/navigation"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, deleteCookie } from "~/lib/cookies"

const signOut = async (): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.SIGN_OUT}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	await deleteCookie(Cookie.SESSION_TOKEN)

	return redirect(routes.web.SIGN_IN)
}

export { signOut }

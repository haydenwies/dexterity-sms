"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { AUTH_COOKIE } from "@repo/types/auth"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"
import { deleteCookie } from "~/lib/cookies"

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

	await deleteCookie(AUTH_COOKIE)

	return redirect(routes.web.SIGN_IN)
}

export { signOut }

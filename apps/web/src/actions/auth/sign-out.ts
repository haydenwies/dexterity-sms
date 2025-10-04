"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"

import { sessionMiddleware } from "~/actions/utils"
import { deleteCookie } from "~/lib/cookies"
import { getBackendUrl } from "~/lib/url"

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

	await deleteCookie(SESSION_COOKIE)

	return redirect(routes.web.SIGN_IN)
}

export { signOut }

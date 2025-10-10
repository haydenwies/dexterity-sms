"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"

import { actionError, ActionResult } from "~/lib/actions"
import { deleteCookie, getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const signOut = async (): Promise<ActionResult> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.SIGN_OUT}`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${sessionToken}`
			}
		})
		if (!res.ok) {
			const errData = await res.json()
			return actionError(errData.message)
		}

		await deleteCookie(SESSION_COOKIE)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}

	redirect(routes.web.SIGN_IN)
}

export { signOut }

"use server"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"

import { actionError, actionSuccess, type ActionResult } from "~/lib/actions"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const getAvailableSenders = async (organizationId: string): Promise<ActionResult<string[]>> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.GET_AVAILABLE_SENDERS(organizationId)}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${sessionToken}`
			}
		})
		if (!res.ok) {
			const errData = await res.json()
			return actionError(errData.message)
		}

		const data = await res.json()

		return actionSuccess(data)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { getAvailableSenders }

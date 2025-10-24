"use server"

import { routes } from "@dexterity-sms/routes"

import { actionError, actionSuccess, type ActionResult } from "~/lib/actions"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getAvailableSenders = async (organizationId: string): Promise<ActionResult<string[]>> => {
	const sessionToken = await getSessionToken()
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

"use server"

import { routes } from "@repo/routes"
import { type SendMessageDto } from "@repo/types/conversation"

import { actionError, actionSuccess, type ActionResult } from "~/lib/actions"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const sendMessage = async (
	organizationId: string,
	conversationId: string,
	dto: SendMessageDto
): Promise<ActionResult> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.SEND_MESSAGE(organizationId, conversationId)}`, {
			method: "POST",
			body: JSON.stringify(dto),
			headers: {
				"Authorization": `Bearer ${sessionToken}`,
				"Content-Type": "application/json"
			}
		})
		if (!res.ok) {
			const errData = await res.json()
			return actionError(errData.message)
		}

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { sendMessage }

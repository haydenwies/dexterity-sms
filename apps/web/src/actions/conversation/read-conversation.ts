"use server"

import { routes } from "@repo/routes"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendPrivateUrl } from "~/lib/url"

const readConversation = async (organizationId: string, conversationId: string): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.READ_CONVERSATION(organizationId, conversationId)}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${sessionToken}`,
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}
}

export { readConversation }

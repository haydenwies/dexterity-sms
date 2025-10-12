import "server-only"

import { routes } from "@repo/routes"
import { type MessageModel } from "@repo/types/message"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyConversationMessages = async (organizationId: string, conversationId: string): Promise<MessageModel[]> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	console.log("[CACHE CHECK] getManyConversationMessages - Starting fetch")
	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_CONVERSATION_MESSAGES(organizationId, conversationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` }
	})
	console.log("[CACHE CHECK] getManyConversationMessages - Response status:", res.status)
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyConversationMessages }

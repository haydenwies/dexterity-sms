import "server-only"

import { routes } from "@repo/routes"
import { type ConversationModel } from "@repo/types/conversation"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/url"

const getConversation = async (organizationId: string, conversationId: string): Promise<ConversationModel> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_CONVERSATION(organizationId, conversationId)}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getConversation }

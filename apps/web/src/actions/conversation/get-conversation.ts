"use server"

import { routes } from "@repo/routes"
import { type ConversationModel } from "@repo/types/conversation"
import { getBackendUrl } from "~/lib/backend"
import { sessionMiddleware } from "../utils"

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

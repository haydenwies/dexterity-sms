import "server-only"

import { routes } from "@repo/routes"
import { type ConversationModel } from "@repo/types/conversation"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getConversation = async (organizationId: string, conversationId: string): Promise<ConversationModel> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_CONVERSATION(organizationId, conversationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		cache: "no-store",
		next: { revalidate: 0 }
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getConversation }

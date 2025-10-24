import "server-only"

import { type MessageModel } from "@dexterity-sms/core/message"
import { routes } from "@dexterity-sms/routes"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyConversationMessages = async (organizationId: string, conversationId: string): Promise<MessageModel[]> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_MANY_CONVERSATION_MESSAGES(organizationId, conversationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` }
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyConversationMessages }

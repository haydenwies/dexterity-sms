import "server-only"

import { routes } from "@repo/routes"
import { type MessageModel } from "@repo/types/message"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/url"

const getManyConversationMessages = async (organizationId: string, conversationId: string): Promise<MessageModel[]> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(
		`${backendUrl}${routes.backend.GET_CONVERSATION_MESSAGES(organizationId, conversationId)}`,
		{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${sessionToken}`
			}
		}
	)
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyConversationMessages }

import "server-only"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type MessageModel } from "@repo/types/message"

import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyConversationMessages = async (organizationId: string, conversationId: string): Promise<MessageModel[]> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
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

import "server-only"

import { routes } from "@repo/routes"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyConversationsUnreadCount = async (organizationId: string): Promise<{ count: number }> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	console.log("[CACHE CHECK] getManyConversationsUnreadCount - Starting fetch")
	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_TOTAL_UNREAD_COUNT(organizationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` }
	})
	console.log("[CACHE CHECK] getManyConversationsUnreadCount - Response status:", res.status)
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyConversationsUnreadCount }

import "server-only"

import { routes } from "@repo/routes"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getTotalUnreadCount = async (organizationId: string): Promise<number> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_TOTAL_UNREAD_COUNT(organizationId)}`
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

	return data.count
}

export { getTotalUnreadCount }

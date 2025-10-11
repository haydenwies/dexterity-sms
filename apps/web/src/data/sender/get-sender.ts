import "server-only"

import { routes } from "@repo/routes"
import { type SenderModel } from "@repo/types/sender"

import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getSender = async (organizationId: string): Promise<SenderModel | undefined> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_SENDER(organizationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		next: { tags: [CACHE_TAGS.senders(organizationId)] }
	})
	if (!res.ok) {
		if (res.status === 404) return undefined

		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getSender }

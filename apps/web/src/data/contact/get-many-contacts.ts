import "server-only"

import { routes } from "@repo/routes"
import { type ContactModel } from "@repo/types/contact"

import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyContacts = async (organizationId: string, ctx?: { from: string }): Promise<ContactModel[]> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	console.log("[CACHE CHECK] getManyContacts - Starting fetch from", ctx?.from)
	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_ALL_CONTACTS(organizationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		cache: "force-cache",
		next: { tags: [CACHE_TAGS.allContacts(organizationId)] }
	})
	console.log("[CACHE CHECK] getManyContacts - Response status:", res.status)
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyContacts }

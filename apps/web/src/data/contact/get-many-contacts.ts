import "server-only"

import { routes } from "@repo/routes"
import { type ContactModel } from "@repo/types/contact"

import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyContacts = async (organizationId: string): Promise<ContactModel[]> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_ALL_CONTACTS(organizationId)}`, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		next: { tags: [CACHE_TAGS.allContacts(organizationId)] }
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyContacts }

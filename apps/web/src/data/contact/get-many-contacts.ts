import "server-only"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type ContactModel } from "@repo/types/contact"

import { CACHE_TAGS } from "~/lib/cache"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyContacts = async (organizationId: string): Promise<ContactModel[]> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_ALL_CONTACTS(organizationId)}`, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		next: { tags: [CACHE_TAGS.contacts(organizationId)] }
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyContacts }

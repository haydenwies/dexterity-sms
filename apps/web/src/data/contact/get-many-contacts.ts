import "server-only"

import { routes } from "@repo/routes"
import { type ContactModel } from "@repo/types/contact"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const getManyContacts = async (organizationId: string): Promise<ContactModel[]> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_ALL_CONTACTS(organizationId)}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyContacts }

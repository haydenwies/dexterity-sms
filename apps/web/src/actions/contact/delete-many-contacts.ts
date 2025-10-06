"use server"

import { routes } from "@repo/routes"
import { type DeleteManyContactsDto } from "@repo/types/contact"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendPrivateUrl } from "~/lib/url"

const deleteManyContacts = async (organizationId: string, dto: DeleteManyContactsDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.DELETE_MANY_CONTACTS(organizationId)}`, {
		method: "DELETE",
		body: JSON.stringify(dto),
		headers: {
			"Authorization": `Bearer ${sessionToken}`,
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}
}

export { deleteManyContacts }

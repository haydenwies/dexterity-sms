"use server"

import { routes } from "@repo/routes"
import { type UpdateContactDto } from "@repo/types/contact/dto"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const updateContact = async (organizationId: string, contactId: string, dto: UpdateContactDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.UPDATE_CONTACT(organizationId, contactId)}`, {
		method: "PUT",
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

export { updateContact }

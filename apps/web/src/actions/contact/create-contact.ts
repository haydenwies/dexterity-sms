"use server"

import { routes } from "@repo/routes"
import { CreateContactDto } from "@repo/types/contact/dto/create-contact"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const createContact = async (organizationId: string, dto: CreateContactDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.CREATE_CONTACT(organizationId)}`, {
		method: "POST",
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

export { createContact }

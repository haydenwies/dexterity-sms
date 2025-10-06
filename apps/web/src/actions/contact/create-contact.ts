"use server"

import { routes } from "@repo/routes"
import { type CreateContactDto } from "@repo/types/contact"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendPrivateUrl } from "~/lib/url"

const createContact = async (organizationId: string, dto: CreateContactDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendPrivateUrl()
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

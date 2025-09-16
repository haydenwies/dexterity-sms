"use server"

import { routes } from "@repo/routes"
import { type CreateConversationDto } from "@repo/types/conversation"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const createConversation = async (organizationId: string, dto: CreateConversationDto): Promise<undefined> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.CREATE_CONVERSATION(organizationId)}`, {
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

export { createConversation }

"use server"

import { routes } from "@repo/routes"
import { type SendMessageDto } from "@repo/types/conversation"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const sendMessage = async (organizationId: string, conversationId: string, dto: SendMessageDto): Promise<undefined> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.SEND_MESSAGE(organizationId, conversationId)}`, {
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

export { sendMessage }

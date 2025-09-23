import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { routes } from "@repo/routes"
import { type MessageModel } from "@repo/types/message"

import { getBackendUrl } from "~/lib/backend"

const useStreamManyConversationMessages = (initalMessages: MessageModel[]) => {
	const [messages, setMessages] = useState<MessageModel[]>(initalMessages)

	const params = useParams()

	useEffect(() => {
		// Validate params
		if (!params.organizationId || Array.isArray(params.organizationId)) return
		if (!params.conversationId || Array.isArray(params.conversationId)) return

		// Get session token
		// TODO: Fix stretegy for accessing cookies
		let token: string | undefined = undefined
		document.cookie.split(";").forEach((cookie) => {
			const [key, value] = cookie.trim().split("=")
			if (key === "session-token") token = value
		})
		if (!token) throw new Error("Session token not found")

		// Get URL and create event source
		const url = `${getBackendUrl()}${routes.backend.STREAM_MANY_CONVERSATION_MESSAGES({
			organizationId: params.organizationId,
			conversationId: params.conversationId,
			searchParams: { token }
		})}`

		const eventSource = new EventSource(url, {
			withCredentials: true
		})

		// Handle on message event
		eventSource.onmessage = (ev: MessageEvent) => {
			const data: MessageModel = JSON.parse(ev.data)
			setMessages((prev) => [...prev, data])
		}

		// Handle on error event
		eventSource.onerror = () => eventSource.close()

		// Clean up
		return () => eventSource.close()
	}, [params.organizationId, params.conversationId])

	return messages
}

export { useStreamManyConversationMessages }

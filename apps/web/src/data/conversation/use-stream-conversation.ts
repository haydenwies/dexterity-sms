import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { routes } from "@repo/routes"
import { type ConversationModel } from "@repo/types/conversation"

import { getBackendUrl } from "~/lib/backend"

const useStreamConversation = (initalConversations: ConversationModel[]) => {
	const [conversations, setConversations] = useState<ConversationModel[]>(initalConversations)

	const params = useParams()

	useEffect(() => {
		// Validate params
		if (!params.organizationId || Array.isArray(params.organizationId)) return
		if (!params.conversationId || Array.isArray(params.conversationId)) return

		// Get session token
		let token: string | undefined = undefined
		document.cookie.split(";").forEach((cookie) => {
			const [key, value] = cookie.split("=")
			if (key === "session-token") {
				token = value
			}
		})
		if (!token) throw new Error("Session token not found")

		// Get URL and create event source
		const url = `${getBackendUrl()}${routes.backend.STREAM_CONVERSATION({
			organizationId: params.organizationId,
			conversationId: params.conversationId,
			searchParams: { token }
		})}`

		const eventSource = new EventSource(url, {
			withCredentials: true
		})

		// Handle on message event
		eventSource.onmessage = (ev: MessageEvent) => {
			const data: ConversationModel = JSON.parse(ev.data)

			const conversation = conversations.find((conversation) => conversation.id === data.id)
			if (conversation) setConversations((prev) => prev.map((c) => (c.id === data.id ? data : c)))
			else setConversations((prev) => [data, ...prev])
		}

		// Handle on error event
		eventSource.onerror = () => eventSource.close()

		// Clean up
		return () => eventSource.close()
	}, [params.organizationId, params.conversationId]) // TODO: Fix dependencies

	return conversations
}

export { useStreamConversation }

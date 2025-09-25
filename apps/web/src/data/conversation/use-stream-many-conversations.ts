import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { routes } from "@repo/routes"
import { type ConversationModel } from "@repo/types/conversation"

import { getBackendUrl } from "~/lib/backend"

const useStreamManyConversations = (initalConversations: ConversationModel[]) => {
	const [conversations, setConversations] = useState<ConversationModel[]>(initalConversations)

	const params = useParams()

	useEffect(() => {
		// Validate params
		if (!params.organizationId || Array.isArray(params.organizationId)) return

		// Get URL and create event source
		const url = `${getBackendUrl()}${routes.backend.STREAM_MANY_CONVERSATIONS({
			organizationId: params.organizationId
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
	}, [params.organizationId]) // TODO: Fix dependencies

	return conversations
}

export { useStreamManyConversations }

import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { routes } from "@repo/routes"
import { type ConversationModel } from "@repo/types/conversation"

import { getBackendPublicUrl } from "~/lib/url"

const useStreamManyConversations = (initalConversations: ConversationModel[]) => {
	const [conversations, setConversations] = useState<ConversationModel[]>(initalConversations)

	const params = useParams()

	const connect = useCallback((): EventSource => {
		// Validate params
		if (!params.organizationId || Array.isArray(params.organizationId))
			throw new Error("Organization ID is required")

		// Get URL and create event source
		const url = `${getBackendPublicUrl()}${routes.backend.STREAM_MANY_CONVERSATIONS({
			organizationId: params.organizationId
		})}`

		const eventSource = new EventSource(url, {
			withCredentials: true
		})

		return eventSource
	}, [params.organizationId])

	useEffect(() => {
		const eventSource = connect()

		// Handle on message event
		eventSource.onmessage = (ev: MessageEvent) => {
			const data: ConversationModel = JSON.parse(ev.data)

			setConversations((prev) => {
				const existingConversation = prev.find((conversation) => conversation.id === data.id)
				if (existingConversation)
					return prev.map((conversation) => (conversation.id === data.id ? data : conversation))
				else return [...prev, data]
			})
		}

		// Clean up
		return () => eventSource.close()
	}, [connect])

	return conversations
}

export { useStreamManyConversations }

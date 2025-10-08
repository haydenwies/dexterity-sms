import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { routes } from "@repo/routes"
import { type MessageModel } from "@repo/types/message"

import { getBackendPublicUrl } from "~/lib/url"

const useStreamManyConversationMessages = (initalMessages: MessageModel[]) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [messages, setMessages] = useState<MessageModel[]>(initalMessages)

	const params = useParams()

	const connect = useCallback((): EventSource => {
		// Validate params
		if (!params.organizationId || Array.isArray(params.organizationId))
			throw new Error("Organization ID is required")
		if (!params.conversationId || Array.isArray(params.conversationId))
			throw new Error("Conversation ID is required")

		// Get URL and create event source
		const url = `${getBackendPublicUrl()}${routes.backend.STREAM_MANY_CONVERSATION_MESSAGES({
			organizationId: params.organizationId,
			conversationId: params.conversationId
		})}`

		const eventSource = new EventSource(url, {
			withCredentials: true
		})

		return eventSource
	}, [params.organizationId, params.conversationId])

	useEffect(() => {
		const eventSource = connect()

		eventSource.onopen = () => {
			setIsConnected(true)
			console.log("message stream opened")
		}

		// Handle on message event
		eventSource.onmessage = (ev: MessageEvent) => {
			const data: MessageModel = JSON.parse(ev.data)
			console.log("message received: ", data)

			setMessages((prev) => {
				const existingMessage = prev.find((message) => message.id === data.id)
				if (existingMessage) return prev.map((message) => (message.id === data.id ? data : message))
				else return [...prev, data]
			})
		}

		// Handle on error event
		eventSource.onerror = (error) => {
			console.error("EventSource error:", error)
			setIsConnected(false)
		}

		// Clean up
		return () => {
			eventSource.close()
			setIsConnected(false)
		}
	}, [connect])

	return messages
}

export { useStreamManyConversationMessages }

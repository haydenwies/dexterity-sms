import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

import { readConversation } from "~/actions/conversation/read-conversation"

const useReadConversation = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const markAsRead = useCallback(async () => {
		setLoading(true)
		setError(null)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")
			const conversationId = params.conversationId
			if (!conversationId || Array.isArray(conversationId)) throw new Error("Conversation ID is required")

			await readConversation(organizationId, conversationId)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}, [params.organizationId, params.conversationId])

	return { loading, error, markAsRead }
}

export { useReadConversation }

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
			if (!params.organizationId || Array.isArray(params.organizationId))
				throw new Error("Organization ID is required")
			if (!params.conversationId || Array.isArray(params.conversationId))
				throw new Error("Conversation ID is required")

			await readConversation(params.organizationId, params.conversationId)
		} catch (err) {
			if (err instanceof Error) setError(err.message)
			else setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}, [params.organizationId, params.conversationId])

	return { loading, error, markAsRead }
}

export { useReadConversation }

import { toast } from "@repo/ui/components/sonner"
import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

import { readConversation } from "~/actions/conversation/read-conversation"

const useReadConversation = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()

	const markAsRead = useCallback(async () => {
		setLoading(true)

		try {
			if (!params.organizationId || Array.isArray(params.organizationId))
				throw new Error("Organization ID is required")
			if (!params.conversationId || Array.isArray(params.conversationId))
				throw new Error("Conversation ID is required")

			await readConversation(params.organizationId, params.conversationId)
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}, [params.organizationId, params.conversationId])

	return { loading, markAsRead }
}

export { useReadConversation }

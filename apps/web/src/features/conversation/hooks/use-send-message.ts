import { useParams } from "next/navigation"
import { useState } from "react"
import { sendMessage } from "~/actions/conversation/send-message"

const useSendMessage = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const handleSendMessage = async (body: string) => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")
			const conversationId = params.conversationId
			if (!conversationId || Array.isArray(conversationId)) throw new Error("Conversation ID is required")

			await sendMessage(organizationId, conversationId, { body })
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}

		setError(null)
	}

	return { loading, error, handleSendMessage }
}

export { useSendMessage }

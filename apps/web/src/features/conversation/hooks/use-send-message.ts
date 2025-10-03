import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SendMessageDto, sendMessageDtoSchema } from "@repo/types/conversation"

import { sendMessage } from "~/actions/conversation/send-message"

const useSendMessage = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const sendConversationMessageForm = useForm<SendMessageDto>({
		resolver: zodResolver(sendMessageDtoSchema),
		defaultValues: {
			body: ""
		}
	})

	const handleSendMessage = sendConversationMessageForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")
			const conversationId = params.conversationId
			if (!conversationId || Array.isArray(conversationId)) throw new Error("Conversation ID is required")

			await sendMessage(organizationId, conversationId, data)

			sendConversationMessageForm.reset()
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
			setError(errorMessage)
		} finally {
			setLoading(false)
		}

		setError(null)
	})

	return { loading, error, sendConversationMessageForm, handleSendMessage }
}

export { useSendMessage }

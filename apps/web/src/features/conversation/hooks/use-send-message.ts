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
			if (!params.organizationId || Array.isArray(params.organizationId))
				throw new Error("Organization ID is required")
			if (!params.conversationId || Array.isArray(params.conversationId))
				throw new Error("Conversation ID is required")

			await sendMessage(params.organizationId, params.conversationId, data)

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

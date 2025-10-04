import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SendMessageDto, sendMessageDtoSchema } from "@repo/types/conversation"
import { toast } from "@repo/ui/components/sonner"

import { sendMessage } from "~/actions/conversation/send-message"

const useSendMessage = () => {
	const [loading, setLoading] = useState<boolean>(false)
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
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, sendConversationMessageForm, handleSendMessage }
}

export { useSendMessage }

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

		if (!params.organizationId || Array.isArray(params.organizationId)) {
			toast.error("Organization ID is required")
			return
		}
		if (!params.conversationId || Array.isArray(params.conversationId)) {
			toast.error("Conversation ID is required")
			return
		}

		const res = await sendMessage(params.organizationId, params.conversationId, data)
		if (!res.success) {
			toast.error(res.error)
			return
		}

		setLoading(false)
	})

	return { loading, sendConversationMessageForm, handleSendMessage }
}

export { useSendMessage }

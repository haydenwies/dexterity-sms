import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

import { toast } from "@dexterity-sms/ui/components/sonner"

import { readConversation } from "~/actions/conversation/read-conversation"

const useReadConversation = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()

	const markAsRead = useCallback(async () => {
		setLoading(true)

		if (!params.organizationId || Array.isArray(params.organizationId)) {
			toast.error("Organization ID is required")
			return
		}
		if (!params.conversationId || Array.isArray(params.conversationId)) {
			toast.error("Conversation ID is required")
			return
		}

		const res = await readConversation(params.organizationId, params.conversationId)
		if (!res.success) {
			toast.error(res.error)
			return
		}

		setLoading(false)
	}, [params.organizationId, params.conversationId])

	return { loading, markAsRead }
}

export { useReadConversation }

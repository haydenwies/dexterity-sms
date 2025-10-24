import { routes } from "@dexterity-sms/routes"

import { getBackendPublicUrl } from "~/lib/url"

const streamManyConversationMessages = (organizationId: string, conversationId: string): EventSource => {
	const url = `${getBackendPublicUrl()}${routes.backend.STREAM_MANY_CONVERSATION_MESSAGES({
		organizationId: organizationId,
		conversationId: conversationId
	})}`

	const eventSource = new EventSource(url, {
		withCredentials: true
	})

	return eventSource
}

export { streamManyConversationMessages }

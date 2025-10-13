import { routes } from "@repo/routes"

import { getBackendPublicUrl } from "~/lib/url"

const streamManyConversationsUnreadCount = (organizationId: string): EventSource => {
	const url = `${getBackendPublicUrl()}${routes.backend.STREAM_MANY_CONVERSATIONS_UNREAD_COUNT({
		organizationId: organizationId
	})}`

	const eventSource = new EventSource(url, {
		withCredentials: true
	})

	return eventSource
}

export { streamManyConversationsUnreadCount }

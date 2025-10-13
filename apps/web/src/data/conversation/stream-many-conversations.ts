import { routes } from "@repo/routes"

import { getBackendPublicUrl } from "~/lib/url"

const streamManyConversations = (organizationId: string): EventSource => {
	const url = `${getBackendPublicUrl()}${routes.backend.STREAM_MANY_CONVERSATIONS({
		organizationId
	})}`

	const eventSource = new EventSource(url, {
		withCredentials: true
	})

	return eventSource
}

export { streamManyConversations }

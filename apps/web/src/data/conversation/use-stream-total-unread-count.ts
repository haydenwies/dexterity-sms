import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { routes } from "@repo/routes"

import { getBackendPublicUrl } from "~/lib/url"

const useStreamTotalUnreadCount = (initialCount: number): number => {
	const [count, setCount] = useState<number>(initialCount)

	const params = useParams()

	const connect = useCallback((): EventSource => {
		// Validate params
		if (!params.organizationId || Array.isArray(params.organizationId))
			throw new Error("Organization ID is required")

		// Get URL and create event source
		const url = `${getBackendPublicUrl()}${routes.backend.STREAM_TOTAL_UNREAD_COUNT({
			organizationId: params.organizationId
		})}`

		const eventSource = new EventSource(url, {
			withCredentials: true
		})

		return eventSource
	}, [params.organizationId])

	useEffect(() => {
		const eventSource = connect()

		// Handle on message event
		eventSource.onmessage = (ev: MessageEvent) => {
			const data: { count: number } = JSON.parse(ev.data)
			setCount(data.count)
		}

		// Clean up
		return () => eventSource.close()
	}, [connect])

	return count
}

export { useStreamTotalUnreadCount }

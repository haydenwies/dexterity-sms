import { useCallback, useEffect } from "react"

type useSseMethods<T> = {
	onOpen?: () => void
	onMessage?: (data: T) => void
}

const useSse = <T>(eventSourceFn: () => EventSource, methods?: useSseMethods<T>) => {
	const connect = useCallback(() => eventSourceFn(), [eventSourceFn])

	useEffect(() => {
		const eventSource = connect()

		eventSource.onopen = () => {
			methods?.onOpen?.()
		}

		eventSource.onmessage = (ev: MessageEvent) => {
			const data = JSON.parse(ev.data)
			methods?.onMessage?.(data)
		}

		return () => eventSource.close()
	}, [connect, methods])
}

export { useSse }

import { useCallback, useEffect } from "react"

type useSseMethods<T> = {
	onOpen?: () => void | Promise<void>
	onMessage?: (data: T) => void | Promise<void>
	onError?: () => void | Promise<void>
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

		eventSource.onerror = () => {
			methods?.onError?.()
		}

		return () => eventSource.close()
	}, [connect, methods])
}

export { useSse }

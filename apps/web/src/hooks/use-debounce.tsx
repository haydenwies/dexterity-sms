import { useCallback, useRef } from "react"

type Config = {
	delay?: number
}

const useDebounce = ({ delay = 300 }: Config = {}) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const debouncedFn = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<T extends (...args: any[]) => any>(fn: T) => {
			return (...args: Parameters<T>): void => {
				// Clear any existing timeout
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}

				// Set new timeout
				timeoutRef.current = setTimeout(() => {
					fn(...args)
				}, delay)
			}
		},
		[delay]
	)

	// Cleanup function to cancel pending debounced calls
	const cancel = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
	}, [])

	// Cleanup on unmount
	const cleanup = useCallback(() => {
		cancel()
	}, [cancel])

	return {
		debouncedFn,
		cancel,
		cleanup
	}
}

export { useDebounce }

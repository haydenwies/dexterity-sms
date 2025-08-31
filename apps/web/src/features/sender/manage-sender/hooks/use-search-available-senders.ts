import { useCallback, useState } from "react"

import { searchAvailableSenders } from "~/actions/sender/search-available-senders"

const useSearchAvailableSenders = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleSearchAvailableSenders = useCallback(async () => {
		setLoading(true)

		try {
			const res = await searchAvailableSenders()

			return res
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}, [])

	return { loading, error, handleSearchAvailableSenders }
}

export { useSearchAvailableSenders }

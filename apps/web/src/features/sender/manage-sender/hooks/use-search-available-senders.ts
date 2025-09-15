import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

import { searchAvailableSenders } from "~/actions/sender/search-available-senders"

const useSearchAvailableSenders = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const handleSearchAvailableSenders = useCallback(async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const res = await searchAvailableSenders(organizationId)

			return res
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}, [params.organizationId])

	return { loading, error, handleSearchAvailableSenders }
}

export { useSearchAvailableSenders }

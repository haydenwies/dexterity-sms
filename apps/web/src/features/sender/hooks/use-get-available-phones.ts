import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

import { getAvailablePhones } from "~/actions/sender/get-available-phones"

const useGetAvailablePhones = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const handleGetAvailablePhones = useCallback(async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const res = await getAvailablePhones(organizationId)

			return res
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}, [params.organizationId])

	return { loading, error, handleGetAvailablePhones }
}

export { useGetAvailablePhones }

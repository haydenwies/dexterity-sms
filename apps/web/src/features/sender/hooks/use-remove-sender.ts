import { useParams } from "next/navigation"
import { useState } from "react"

import { removeSender } from "~/actions/sender/remove-sender"

const useRemoveSender = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const handleRemoveSender = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			await removeSender(organizationId)
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleRemoveSender }
}

export { useRemoveSender }

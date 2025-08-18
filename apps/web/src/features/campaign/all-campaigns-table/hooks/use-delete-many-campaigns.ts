import { useState } from "react"

type HandleSubmitConfig = {
	onSuccess?: () => void
}

const useDeleteManyCampaigns = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (ids: string[], { onSuccess }: HandleSubmitConfig = {}) => {
		setLoading(true)

		try {
			onSuccess?.()
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		error,
		handleSubmit
	}
}

export { useDeleteManyCampaigns }

import { useState } from "react"

import { removeSender } from "~/actions/sender/remove-sender"

const useReleaseSender = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleReleaseSender = async (senderId: string) => {
		setLoading(true)

		try {
			const res = await removeSender({ senderId })
			if (!res.success) throw new Error(res.message)
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleReleaseSender }
}

export { useReleaseSender }

import { useState } from "react"

import { buySender } from "~/actions/sender/buy-sender"

const useBuySender = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const [selectedAvailableSenderId, setSelectedAvailableSenderId] = useState<string | null>(null)

	const handleBuySender = async (availableSenderId: string) => {
		setSelectedAvailableSenderId(availableSenderId)
		setLoading(true)

		try {
			const res = await buySender({ availableSenderId })
			if (!res.success) throw new Error(res.message)

			return res.data
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setSelectedAvailableSenderId(null)
			setLoading(false)
		}
	}

	return { loading, error, selectedAvailableSenderId, handleBuySender }
}

export { useBuySender }

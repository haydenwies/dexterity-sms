import { useState } from "react"

import { changeSubscription } from "~/actions/billing/change-subscription"

const useManageSubscription = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleChangeSubscription = async (subscriptionId: string) => {
		setLoading(true)
		setError(null)

		try {
			await changeSubscription({ subscriptionId })
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleChangeSubscription }
}

export { useManageSubscription }

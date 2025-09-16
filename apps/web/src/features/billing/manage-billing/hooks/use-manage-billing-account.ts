import { useEffect, useState } from "react"

import { getBillingAccountPortalSession } from "~/actions/billing/get-billing-account-portal-session"

const useManageBillingAccount = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const [manageBillingAccountPortalSession, setManageBillingAccountPortalSession] = useState<string | null>(null)

	useEffect(() => {
		const getManageBillingAccountPortalSession = async () => {
			setLoading(true)

			try {
				const res = await getBillingAccountPortalSession()

				setManageBillingAccountPortalSession(res)
			} catch {
				setError("An unexpected error occurred")
			} finally {
				setLoading(false)
			}
		}

		getManageBillingAccountPortalSession()
	}, [])

	return { loading, error, manageBillingAccountPortalSession }
}

export { useManageBillingAccount }

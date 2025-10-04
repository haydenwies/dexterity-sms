import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { createBillingPortalSession } from "~/actions/billing/create-billing-portal-session"

const useCreateBillingPortalSession = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()

	const redirectToBillingPortalSession = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const billingPortalSession = await createBillingPortalSession(organizationId)

			// Use window.location.href to redirect to pages outside of the app
			window.location.href = billingPortalSession.url
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		}
	}

	return { loading, redirectToBillingPortalSession }
}

export { useCreateBillingPortalSession }

import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { createBillingPortalSession } from "~/actions/billing/create-billing-portal-session"

const useCreateBillingPortalSession = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()

	const redirectToBillingPortalSession = async () => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			toast.error("Organization ID is required")
			return
		}

		const res = await createBillingPortalSession(organizationId)
		if (!res.success) {
			toast.error(res.error)
			return
		}

		// Use window.location.href to redirect to pages outside of the app
		window.location.href = res.data.url
	}

	return { loading, redirectToBillingPortalSession }
}

export { useCreateBillingPortalSession }

import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { createCheckoutSession } from "~/actions/billing/create-checkout-session"

const useCreateCheckoutSession = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()

	const redirectToCheckoutSession = async () => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			toast.error("Organization ID is required")
			return
		}

		const res = await createCheckoutSession(organizationId)
		if (!res.success) {
			toast.error(res.error)
			return
		}

		// Use window.location.href to redirect to pages outside of the app
		window.location.href = res.data.url
	}

	return { loading, redirectToCheckoutSession }
}

export { useCreateCheckoutSession }

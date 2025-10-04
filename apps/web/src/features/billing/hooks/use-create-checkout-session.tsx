import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { createCheckoutSession } from "~/actions/billing/create-checkout-session"

const useCreateCheckoutSession = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()

	const redirectToCheckoutSession = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const checkoutSession = await createCheckoutSession(organizationId)

			// Use window.location.href to redirect to pages outside of the app
			window.location.href = checkoutSession.url
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		}
	}

	return { loading, redirectToCheckoutSession }
}

export { useCreateCheckoutSession }

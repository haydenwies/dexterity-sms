import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { createCheckoutSession } from "~/actions/billing/create-checkout-session"

const useCheckout = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()
	const router = useRouter()

	const redirectToCheckout = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const { url } = await createCheckoutSession(organizationId)

			router.push(url)
		} catch {
			toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, redirectToCheckout }
}

export { useCheckout }

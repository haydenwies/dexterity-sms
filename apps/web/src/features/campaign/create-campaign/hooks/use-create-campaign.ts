import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { createCampaign } from "~/actions/campaign/create-campaign"
import { routes } from "~/lib/routes"

const useCreateCampaign = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()
	const { organizationId } = useParams()

	const handleCreateCampaign = async () => {
		setLoading(true)

		try {
			if (typeof organizationId !== "string") throw new Error("Organization ID is required")

			const res = await createCampaign({})
			if (!res.success) {
				setError(res.message)
				return
			}

			router.push(routes.EDIT_CAMPAIGN(organizationId, "123"))
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		error,
		handleCreateCampaign
	}
}

export { useCreateCampaign }

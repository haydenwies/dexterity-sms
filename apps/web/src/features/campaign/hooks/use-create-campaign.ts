import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { createCampaign } from "~/actions/campaign/create-campaign"
import { routes } from "~/lib/routes"

const useCreateCampaign = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()
	const params = useParams()

	const handleCreate = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			await createCampaign(organizationId, {})

			router.push(routes.EDIT_CAMPAIGN(organizationId, "123"))
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleCreate }
}

export { useCreateCampaign }

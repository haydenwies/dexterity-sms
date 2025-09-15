import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { routes } from "@repo/routes"

import { createCampaign } from "~/actions/campaign/create-campaign"

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

			const campaign = await createCampaign(organizationId, {})

			// console.log(routes.web.UPDATE_CAMPAIGN(organizationId, campaign.id))

			router.push(routes.web.UPDATE_CAMPAIGN(organizationId, campaign.id))
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleCreate }
}

export { useCreateCampaign }

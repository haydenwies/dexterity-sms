import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { routes } from "@repo/routes"
import { toast } from "@repo/ui/components/sonner"

import { createCampaign } from "~/actions/campaign/create-campaign"

const useCreateCampaign = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const router = useRouter()
	const params = useParams()

	const handleCreate = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const campaign = await createCampaign(organizationId, {})

			router.push(routes.web.UPDATE_CAMPAIGN(organizationId, campaign.id))
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, handleCreate }
}

export { useCreateCampaign }

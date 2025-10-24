import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { routes } from "@dexterity-sms/routes"
import { toast } from "@dexterity-sms/ui/components/sonner"

import { createCampaign } from "~/actions/campaign/create-campaign"

const useCreateCampaign = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const router = useRouter()
	const params = useParams()

	const handleCreate = async () => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			toast.error("Organization ID is required")
			return
		}

		const res = await createCampaign(organizationId, {})
		if (!res.success) {
			toast.error(res.error)
			return
		}

		router.push(routes.web.UPDATE_CAMPAIGN(organizationId, res.data.id))
	}

	return { loading, handleCreate }
}

export { useCreateCampaign }

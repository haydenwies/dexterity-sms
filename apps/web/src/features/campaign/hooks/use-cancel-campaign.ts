import { useParams } from "next/navigation"
import { useState } from "react"

import { type CampaignModel } from "@repo/types/campaign"
import { toast } from "@repo/ui/components/sonner"

import { cancelCampaign } from "~/actions/campaign/cancel-campaign"

const useCancelCampaign = (campaign: CampaignModel) => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()

	type HandleCancelCampaignOptions = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleCancelCampaign = async ({ onError, onSuccess }: HandleCancelCampaignOptions = {}) => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			toast.error("Organization ID is required")
			onError?.()
			setLoading(false)
			return
		}

		const res = await cancelCampaign(organizationId, campaign.id)
		if (!res.success) {
			toast.error(res.error)
			onError?.()
			setLoading(false)
			return
		}

		toast.success("Your campaign has been cancelled")

		onSuccess?.()

		setLoading(false)
	}

	return { loading, handleCancelCampaign }
}

export { useCancelCampaign }

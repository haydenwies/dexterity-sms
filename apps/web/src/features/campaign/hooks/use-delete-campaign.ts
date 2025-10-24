import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@dexterity-sms/ui/components/sonner"

import { deleteManyCampaigns } from "~/actions/campaign/delete-many-campaigns"

const useDeleteCampaign = () => {
	const params = useParams()

	const [loading, setLoading] = useState<boolean>(false)

	type HandleDeleteManyConfig = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleDeleteMany = async (ids: string[], { onError, onSuccess }: HandleDeleteManyConfig) => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			toast.error("Organization ID is required")
			onError?.()
			setLoading(false)
			return
		}

		const res = await deleteManyCampaigns(organizationId, { ids })
		if (!res.success) {
			toast.error(res.error)
			onError?.()
			setLoading(false)
			return
		}

		onSuccess?.()

		setLoading(false)
	}

	return { loading, handleDeleteMany }
}

export { useDeleteCampaign }

import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

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

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			await deleteManyCampaigns(organizationId, { ids })
			onSuccess?.()
		} catch {
			toast.error("An unknown error occurred")
			onError?.()
		} finally {
			setLoading(false)
		}
	}

	return { loading, handleDeleteMany }
}

export { useDeleteCampaign }

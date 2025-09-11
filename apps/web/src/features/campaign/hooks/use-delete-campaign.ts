import { useParams } from "next/navigation"
import { useState } from "react"

import { deleteManyCampaigns } from "~/actions/campaign/delete-many-campaigns"

const useDeleteCampaign = () => {
	const params = useParams()

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

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
			setError("An unknown error occurred")
			onError?.()
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleDeleteMany }
}

export { useDeleteCampaign }

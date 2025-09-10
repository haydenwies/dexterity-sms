import { useParams } from "next/navigation"
import { useState } from "react"

import { deleteManyContacts } from "~/actions/contact/delete-many-contacts"

const useDeleteContact = () => {
	const params = useParams()

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	type HandleSubmitConfig = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleDeleteMany = async (ids: string[], { onError, onSuccess }: HandleSubmitConfig) => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			setError("Organization ID is required")
			onError?.()
			return
		}

		try {
			await deleteManyContacts(organizationId, { ids })
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

export { useDeleteContact }

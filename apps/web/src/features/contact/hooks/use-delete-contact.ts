import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { deleteManyContacts } from "~/actions/contact/delete-many-contacts"

const useDeleteContact = () => {
	const params = useParams()

	const [loading, setLoading] = useState<boolean>(false)

	type HandleDeleteManyConfig = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleDeleteMany = async (ids: string[], { onError, onSuccess }: HandleDeleteManyConfig) => {
		setLoading(true)

		if (!params.organizationId || Array.isArray(params.organizationId)) {
			toast.error("Organization ID is required")
			return
		}

		const res = await deleteManyContacts(params.organizationId, { ids })
		if (!res.success) {
			toast.error(res.error)
			onError?.()
			return
		}

		onSuccess?.()

		setLoading(false)
	}

	return { loading, handleDeleteMany }
}

export { useDeleteContact }

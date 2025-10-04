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

		try {
			if (!params.organizationId || Array.isArray(params.organizationId))
				throw new Error("Organization ID is required")

			await deleteManyContacts(params.organizationId, { ids })
			onSuccess?.()
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")

			onError?.()
		} finally {
			setLoading(false)
		}
	}

	return { loading, handleDeleteMany }
}

export { useDeleteContact }

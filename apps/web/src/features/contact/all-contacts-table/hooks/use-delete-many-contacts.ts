import { useState } from "react"

import { deleteManyContacts } from "~/actions/contact/delete-many-contacts"

type HandleSubmitConfig = {
	onSuccess?: () => void
}

const useDeleteManyContacts = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (ids: string[], { onSuccess }: HandleSubmitConfig = {}) => {
		setLoading(true)

		try {
			const res = await deleteManyContacts({ ids })
			if (!res.success) {
				setError(res.message)
				return
			}

			onSuccess?.()
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, handleSubmit }
}

export { useDeleteManyContacts }

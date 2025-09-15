import { useParams } from "next/navigation"
import { useState } from "react"

import { addSender } from "~/actions/sender/add-sender"

const useAddSender = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const [selectedPhone, setSelectedPhone] = useState<string | null>(null)

	const params = useParams()

	const handleAddSender = async (phone: string) => {
		setSelectedPhone(phone)
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			await addSender(organizationId, { phone }) // TODO: fix this
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setSelectedPhone(null)
			setLoading(false)
		}
	}

	return { loading, error, selectedPhone, handleAddSender }
}

export { useAddSender }

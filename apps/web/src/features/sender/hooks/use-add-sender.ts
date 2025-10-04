import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { addSender } from "~/actions/sender/add-sender"

const useAddSender = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const [selectedPhone, setSelectedPhone] = useState<string | null>(null)

	const params = useParams()

	const handleAddSender = async (phone: string) => {
		setSelectedPhone(phone)
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			await addSender(organizationId, { phone })
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unexpected error occurred")
		} finally {
			setSelectedPhone(null)
			setLoading(false)
		}
	}

	return { loading, selectedPhone, handleAddSender }
}

export { useAddSender }

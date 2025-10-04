import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { removeSender } from "~/actions/sender/remove-sender"

const useRemoveSender = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()

	const handleRemoveSender = async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			await removeSender(organizationId)
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return { loading, handleRemoveSender }
}

export { useRemoveSender }

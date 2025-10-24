import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@dexterity-sms/ui/components/sonner"

import { removeSender } from "~/actions/sender/remove-sender"

const useRemoveSender = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()

	const handleRemoveSender = async () => {
		setLoading(true)

		if (!params.organizationId || Array.isArray(params.organizationId)) {
			toast.error("Organization ID is required")
			return
		}

		const res = await removeSender(params.organizationId)
		if (!res.success) {
			toast.error(res.error)
			return
		}

		setLoading(false)
	}

	return { loading, handleRemoveSender }
}

export { useRemoveSender }

import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { addSender } from "~/actions/sender/add-sender"

const useAddSender = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()

	const handleAddSender = async (phone: string) => {
		setLoading(true)

		if (!params.organizationId || Array.isArray(params.organizationId)) {
			toast.error("Organization ID is required")
			return
		}

		const res = await addSender(params.organizationId, { phone })
		if (!res.success) {
			toast.error(res.error)
			return
		}

		setLoading(false)
	}

	return { loading, handleAddSender }
}

export { useAddSender }

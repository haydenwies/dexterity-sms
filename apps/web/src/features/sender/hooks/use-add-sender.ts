import { useParams } from "next/navigation"
import { useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { addSender } from "~/actions/sender/add-sender"

const useAddSender = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()

	type HandleAddSenderOptions = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleAddSender = async (phone: string, options?: HandleAddSenderOptions) => {
		setLoading(true)

		if (!params.organizationId || Array.isArray(params.organizationId)) {
			toast.error("Organization ID is required")
			options?.onError?.()
			setLoading(false)
			return
		}

		const res = await addSender(params.organizationId, { phone })
		if (!res.success) {
			toast.error(res.error)
			options?.onError?.()
			setLoading(false)
			return
		}

		options?.onSuccess?.()

		setLoading(false)
	}

	return { loading, handleAddSender }
}

export { useAddSender }

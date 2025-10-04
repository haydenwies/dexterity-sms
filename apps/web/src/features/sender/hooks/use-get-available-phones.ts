import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

import { toast } from "@repo/ui/components/sonner"

import { getAvailablePhones } from "~/actions/sender/get-available-phones"

const useGetAvailablePhones = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const params = useParams()

	const handleGetAvailablePhones = useCallback(async () => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

			const res = await getAvailablePhones(organizationId)

			return res
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}, [params.organizationId])

	return { loading, handleGetAvailablePhones }
}

export { useGetAvailablePhones }

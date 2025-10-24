import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { toast } from "@dexterity-sms/ui/components/sonner"

import { getAvailableSenders } from "~/actions/sender/get-available-phones"

const useGetAvailableSenders = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [availableSenders, setAvailableSenders] = useState<string[]>([])

	const params = useParams()

	useEffect(() => {
		const run = async () => {
			if (availableSenders.length > 0) return

			setLoading(true)

			if (!params.organizationId || Array.isArray(params.organizationId)) {
				toast.error("Organization ID is required")
				return
			}

			const res = await getAvailableSenders(params.organizationId)
			if (!res.success) {
				toast.error(res.error)
				return
			}

			setAvailableSenders(res.data)
			setLoading(false)
		}

		run()
	}, [params.organizationId, availableSenders.length])

	return { loading, availableSenders }
}

export { useGetAvailableSenders }

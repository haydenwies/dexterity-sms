import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { routes } from "@repo/routes"
import { sendCampaignDtoSchema, type SendCampaignDto } from "@repo/types/campaign"
import { toast } from "@repo/ui/components/sonner"

import { sendCampaign } from "~/actions/campaign/send-campaign"

const useSendCampaign = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const router = useRouter()
	const params = useParams()

	const form = useForm<SendCampaignDto>({
		resolver: zodResolver(sendCampaignDtoSchema),
		defaultValues: {
			scheduledAt: undefined
		}
	})

	const formValues = form.watch()

	const handleSendCampaign = form.handleSubmit(async (data) => {
		setLoading(true)

		const organizationId = params.organizationId
		if (!organizationId || Array.isArray(organizationId)) {
			toast.error("Organization ID is required")
			setLoading(false)
			return
		}
		const campaignId = params.campaignId
		if (!campaignId || Array.isArray(campaignId)) {
			toast.error("Campaign ID is required")
			setLoading(false)
			return
		}

		const res = await sendCampaign(organizationId, campaignId, data)
		if (!res.success) {
			toast.error(res.error)
			setLoading(false)
			return
		}

		toast.success("Your campaign has been scheduled for sending")

		router.push(routes.web.ALL_CAMPAIGNS(organizationId))
	})

	return { loading, form, formValues, handleSendCampaign }
}

export { useSendCampaign }

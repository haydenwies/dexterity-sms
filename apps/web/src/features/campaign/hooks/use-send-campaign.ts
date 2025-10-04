import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { sendCampaignDtoSchema, type SendCampaignDto } from "@repo/types/campaign"
import { toast } from "@repo/ui/components/sonner"

import { routes } from "@repo/routes"
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

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")
			const campaignId = params.campaignId
			if (!campaignId || Array.isArray(campaignId)) throw new Error("Campaign ID is required")

			await sendCampaign(organizationId, campaignId, data)

			router.push(routes.web.ALL_CAMPAIGNS(organizationId))
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		}
	})

	return { loading, form, formValues, handleSendCampaign }
}

export { useSendCampaign }

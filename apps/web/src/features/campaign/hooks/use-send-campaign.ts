import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { sendCampaignDtoSchema, type SendCampaignDto } from "@repo/types/campaign"

import { sendCampaign } from "~/actions/campaign/send-campaign"

const useSendCampaign = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

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
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, form, formValues, handleSendCampaign }
}

export { useSendCampaign }

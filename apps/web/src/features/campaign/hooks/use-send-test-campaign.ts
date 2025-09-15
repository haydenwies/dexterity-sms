import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SendTestCampaignDto, sendTestCampaignDtoSchema } from "@repo/types/campaign"

import { useParams } from "next/navigation"
import { sendTestCampaign } from "~/actions/campaign/send-test-campaign"

const useSendTestCampaign = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const form = useForm<SendTestCampaignDto>({
		resolver: zodResolver(sendTestCampaignDtoSchema),
		defaultValues: {
			to: ""
		}
	})

	const handleSendTest = form.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")
			const campaignId = params.campaignId
			if (!campaignId || Array.isArray(campaignId)) throw new Error("Campaign ID is required")

			await sendTestCampaign(organizationId, campaignId, data)
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, form, handleSendTest }
}
export { useSendTestCampaign }

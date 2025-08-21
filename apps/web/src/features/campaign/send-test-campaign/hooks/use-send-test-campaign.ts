import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { SendTestCampaignDto, sendTestCampaignDtoSchema } from "@repo/types/campaign/dto/send-test-campaign"

import { sendTestCampaign } from "~/actions/campaign/send-test-campaign"

const useSendTestCampaign = (campaignId: string) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<SendTestCampaignDto>({
		resolver: zodResolver(sendTestCampaignDtoSchema),
		defaultValues: {
			campaignId,
			to: ""
		}
	})

	const handleSendTestCampaign = form.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const res = await sendTestCampaign(data)

			if (!res.success) {
				setError(res.message)
				return
			}
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return {
		loading,
		error,
		form,
		handleSendTestCampaign
	}
}
export { useSendTestCampaign }

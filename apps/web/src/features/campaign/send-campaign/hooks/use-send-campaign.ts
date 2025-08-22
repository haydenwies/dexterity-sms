import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { sendCampaignDtoSchema, type SendCampaignDto } from "@repo/types/campaign/dto/send-campaign"

import { sendCampaign } from "~/actions/campaign/send-campaign"

const useSendCampaign = (campaignId: string) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<SendCampaignDto>({
		resolver: zodResolver(sendCampaignDtoSchema),
		defaultValues: {
			campaignId,
			scheduledAt: undefined,
			contactTagIds: undefined
		}
	})

	const handleSendCampaign = form.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const res = await sendCampaign(data)
			if (!res.success) {
				setError(res.message)
				return
			}
		} catch {
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, form, handleSendCampaign }
}

export { useSendCampaign }

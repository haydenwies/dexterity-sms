import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SendTestCampaignDto, sendTestCampaignDtoSchema } from "@repo/types/campaign"
import { toast } from "@repo/ui/components/sonner"

import { sendTestCampaign } from "~/actions/campaign/send-test-campaign"

const useSendTestCampaign = () => {
	const [loading, setLoading] = useState(false)

	const params = useParams()

	const form = useForm<SendTestCampaignDto>({
		resolver: zodResolver(sendTestCampaignDtoSchema),
		defaultValues: {
			to: ""
		}
	})

	type HandleSendTestOptions = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleSendTest = ({ onError, onSuccess }: HandleSendTestOptions = {}) => {
		form.handleSubmit(async (data) => {
			setLoading(true)

			try {
				const organizationId = params.organizationId
				if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")
				const campaignId = params.campaignId
				if (!campaignId || Array.isArray(campaignId)) throw new Error("Campaign ID is required")

				await sendTestCampaign(organizationId, campaignId, data)
				onSuccess?.()
			} catch (err: unknown) {
				if (err instanceof Error) toast.error(err.message)
				else toast.error("An unknown error occurred")

				onError?.()
			} finally {
				setLoading(false)
			}
		})()
	}

	return { loading, form, handleSendTest }
}
export { useSendTestCampaign }

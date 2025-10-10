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

			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) {
				toast.error("Organization ID is required")
				onError?.()
				setLoading(false)
				return
			}
			const campaignId = params.campaignId
			if (!campaignId || Array.isArray(campaignId)) {
				toast.error("Campaign ID is required")
				onError?.()
				setLoading(false)
				return
			}

			const res = await sendTestCampaign(organizationId, campaignId, data)
			if (!res.success) {
				toast.error(res.error)
				onError?.()
				setLoading(false)
				return
			}

			toast.success("Your test has been sent")
			onSuccess?.()

			setLoading(false)
		})()
	}

	return { loading, form, handleSendTest }
}
export { useSendTestCampaign }

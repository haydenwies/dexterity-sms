import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { CampaignModel } from "@repo/types/campaign"
import { UpdateCampaignDto, updateCampaignDtoSchema } from "@repo/types/campaign/dto/update-campaign"

const useUpdateCampaign = (campaign: CampaignModel) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<UpdateCampaignDto>({
		resolver: zodResolver(updateCampaignDtoSchema),
		defaultValues: {
			name: campaign.name,
			body: campaign.body
		}
	})

	return { loading, error, form }
}

export { useUpdateCampaign }

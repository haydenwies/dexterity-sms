import { useContext } from "react"

import { UpdateCampaignContext } from "~/features/campaign/components/update-campaign/provider"

const useUpdateCampaign = () => {
	const ctx = useContext(UpdateCampaignContext)
	if (!ctx) throw new Error("useUpdateCampaign must be called within an UpdateCampaignProvider")

	const { form, saveState } = ctx

	return { form, saveState }
}

export { useUpdateCampaign }

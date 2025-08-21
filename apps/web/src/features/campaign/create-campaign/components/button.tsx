"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { useCreateCampaign } from "~/features/campaign/create-campaign/hooks/use-create-campaign"

const CreateCampaignButton = () => {
	const { handleCreateCampaign } = useCreateCampaign()

	return (
		<Button onClick={handleCreateCampaign}>
			<Icon name={IconName.PLUS} />
			Create Campaign
		</Button>
	)
}

export { CreateCampaignButton }

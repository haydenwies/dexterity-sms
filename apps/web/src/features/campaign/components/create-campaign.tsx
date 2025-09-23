"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { useCreateCampaign } from "~/features/campaign/hooks/use-create-campaign"

const CreateCampaignButton = () => {
	const { loading, handleCreate } = useCreateCampaign()

	return (
		<Button
			disabled={loading}
			onClick={handleCreate}
		>
			{loading ? (
				<Icon
					className="animate-spin"
					name={IconName.SPINNER}
				/>
			) : (
				<Icon name={IconName.PLUS} />
			)}
			New campaign
		</Button>
	)
}

export { CreateCampaignButton }

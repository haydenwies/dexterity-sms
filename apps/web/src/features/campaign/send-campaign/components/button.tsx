"use client"

import { useState } from "react"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { SendCampaignDialog } from "~/features/campaign/send-campaign/components/dialog"

type Props = {
	campaignId: string
}

const SendCampaignButton = ({ campaignId }: Props) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon name={IconName.ARROW_RIGHT} />
				Continue
			</Button>
			<SendCampaignDialog
				open={open}
				onOpenChange={setOpen}
				campaignId={campaignId}
			/>
		</>
	)
}

export { SendCampaignButton }

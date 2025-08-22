"use client"

import { useState } from "react"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { SendTestCampaignDialog } from "~/features/campaign/send-test-campaign/components/dialog"

type Props = {
	campaignId: string
}

const SendTestCampaignButton = ({ campaignId }: Props) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="secondary"
			>
				<Icon name={IconName.TEST_TUBE} />
				Test
			</Button>
			<SendTestCampaignDialog
				campaignId={campaignId}
				setOpen={setOpen}
				open={open}
			/>
		</>
	)
}

export { SendTestCampaignButton }

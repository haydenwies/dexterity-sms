"use client"

import { useState } from "react"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

const CreateCampaignButton = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon name={IconName.PLUS} />
				Create Campaign
			</Button>
		</>
	)
}

export { CreateCampaignButton }

"use client"

import { Icon, IconName } from "@repo/ui/components/icon"
import { cn } from "@repo/ui/lib/utils"
import { useUpdateCampaign } from "../hooks/use-update-campaign"
import { SaveState } from "./provider"

type Props = {
	className?: string
}

const UpdateCampaignSaveState = ({ className }: Props) => {
	const { saveState } = useUpdateCampaign()

	const icon = {
		[SaveState.SAVING]: IconName.SPINNER,
		[SaveState.SAVED]: IconName.CLOUD_CHECK,
		[SaveState.ERROR]: IconName.CLOUD_ALERT
	}

	const text = {
		[SaveState.SAVING]: "Saving...",
		[SaveState.SAVED]: "Saved",
		[SaveState.ERROR]: "Error"
	}

	return (
		<div className={cn("text-muted-foreground flex items-center gap-2 text-sm", className)}>
			<Icon
				className={cn("size-4", { "animate-spin": saveState === SaveState.SAVING })}
				name={icon[saveState]}
			/>
			{text[saveState]}
		</div>
	)
}

export { UpdateCampaignSaveState }

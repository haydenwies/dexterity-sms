"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SendCampaignDialog = ({ open, onOpenChange }: Props) => {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Send Campaign</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export { SendCampaignDialog }

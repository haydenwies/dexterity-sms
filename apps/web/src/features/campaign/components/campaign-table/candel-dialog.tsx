"use client"

import { type CampaignModel } from "@repo/types/campaign"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@repo/ui/components/alert-dialog"
import { Spinner } from "@repo/ui/components/spinner"

import { useCancelCampaign } from "../../hooks/use-cancel-campaign"

type CampaignTableCancelDialogProps = {
	campaign: CampaignModel
	open: boolean
	setOpen: (open: boolean) => void
}
const CampaignTableCancelDialog = ({ campaign, open, setOpen }: CampaignTableCancelDialogProps) => {
	const { loading, handleCancelCampaign } = useCancelCampaign(campaign)

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Cancel Campaign?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to cancel this campaign? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Back</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						variant="destructive"
						onClick={async (e) => {
							e.preventDefault()
							await handleCancelCampaign({ onSuccess: () => setOpen(false) })
						}}
					>
						{loading && <Spinner />}
						Cancel
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { CampaignTableCancelDialog }

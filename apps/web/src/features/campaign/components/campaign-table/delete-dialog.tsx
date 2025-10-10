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

import { useDeleteCampaign } from "~/features/campaign/hooks/use-delete-campaign"

type CampaignTableDeleteDialogProps = {
	campaigns: CampaignModel[]
	open: boolean
	setOpen: (open: boolean) => void
}
const CampaignTableDeleteDialog = ({ campaigns, open, setOpen }: CampaignTableDeleteDialogProps) => {
	const { loading, handleDeleteMany } = useDeleteCampaign()

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Campaign{campaigns.length > 1 && "s"}?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete {campaigns.length > 1 ? campaigns.length : "this"} campaign
						{campaigns.length > 1 && "s"}? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						variant="destructive"
						onClick={async (e) => {
							e.preventDefault()
							await handleDeleteMany(
								campaigns.map((campaign) => campaign.id),
								{ onSuccess: () => setOpen(false) }
							)
						}}
					>
						{loading && <Spinner />}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { CampaignTableDeleteDialog }

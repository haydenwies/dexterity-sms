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

import { useDeleteManyCampaigns } from "~/features/campaign/all-campaigns-table/hooks/use-delete-many-campaigns"

type Props = {
	campaigns: CampaignModel[]
	open: boolean
	setOpen: (open: boolean) => void
}

const AllCampaignsTableDeleteDialog = ({ campaigns, open, setOpen }: Props) => {
	const { loading, handleSubmit } = useDeleteManyCampaigns()

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Campaign{campaigns.length > 1 && "s"}</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete {campaigns.length} campaign{campaigns.length > 1 && "s"}? This
						action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={async (e) => {
							e.preventDefault()
							await handleSubmit(
								campaigns.map((campaign) => campaign.id),
								{ onSuccess: () => setOpen(false) }
							)
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { AllCampaignsTableDeleteDialog }

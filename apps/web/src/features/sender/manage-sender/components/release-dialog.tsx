"use client"

import { type SenderModel } from "@repo/types/sender"
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

import { useReleaseSender } from "~/features/sender/manage-sender/hooks/use-release-sender"

type ReleaseSenderDialogProps = {
	sender: SenderModel
	open: boolean
	setOpen: (open: boolean) => void
}

const ReleaseSenderDialog = ({ sender, open, setOpen }: ReleaseSenderDialogProps) => {
	const { loading, handleReleaseSender } = useReleaseSender()

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Release {sender.value}</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to release this sender? You will no longer be able to send or receive
						messages using this phone number.
					</AlertDialogDescription>
					<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={async () => {
							await handleReleaseSender()
							setOpen(false)
						}}
						variant="destructive"
					>
						Release
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { ReleaseSenderDialog }

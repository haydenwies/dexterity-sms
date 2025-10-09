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
import { Spinner } from "@repo/ui/components/spinner"

import { useRemoveSender } from "~/features/sender/hooks/use-remove-sender"

type RemoveSenderDialogProps = {
	sender: SenderModel
	open: boolean
	setOpen: (open: boolean) => void
}

const RemoveSenderDialog = ({ sender, open, setOpen }: RemoveSenderDialogProps) => {
	const { loading, handleRemoveSender } = useRemoveSender()

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
							await handleRemoveSender()
							setOpen(false)
						}}
						variant="destructive"
					>
						{loading && <Spinner />}
						Release
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { RemoveSenderDialog }

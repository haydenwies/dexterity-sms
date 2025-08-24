"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
}

/**
 * This will display the dialog for a new message, it can remain blank for now
 */
const NewMessageDialog = ({ open, setOpen }: Props) => {
	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Message</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export { NewMessageDialog }

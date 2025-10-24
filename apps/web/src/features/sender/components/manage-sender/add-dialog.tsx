"use client"

import { useState } from "react"

import { Button } from "@dexterity-sms/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@dexterity-sms/ui/components/dialog"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"

import { useAddSender } from "~/features/sender/hooks/use-add-sender"
import { useGetAvailableSenders } from "~/features/sender/hooks/use-get-available-senders"

type AddSenderDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const AddSenderDialog = ({ open, setOpen }: AddSenderDialogProps) => {
	const [selectedSender, setSelectedSender] = useState<string | null>(null)

	const { loading: getAvailableSendersLoading, availableSenders } = useGetAvailableSenders()
	const { loading: addSenderLoading, handleAddSender } = useAddSender()

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (!addSenderLoading) setOpen(o)
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a phone number</DialogTitle>
					<DialogDescription>Choose a phone number to add to your organization</DialogDescription>
				</DialogHeader>
				{getAvailableSendersLoading ? (
					<div className="text-muted-foreground flex items-center justify-center gap-2">
						<Icon
							className="animate-spin"
							name={IconName.SPINNER}
						/>
						<p>Loading...</p>
					</div>
				) : (
					<div className="space-y-2">
						{availableSenders.map((sender) => (
							<div
								className="flex items-center justify-between gap-2"
								key={sender}
							>
								<p>{sender}</p>
								<Button
									disabled={addSenderLoading || !!selectedSender}
									onClick={async () => {
										setSelectedSender(sender)
										await handleAddSender(sender, {
											onSuccess: () => setOpen(false)
										})
									}}
									variant="outline"
								>
									{addSenderLoading && selectedSender === sender && (
										<Icon
											className="animate-spin"
											name={IconName.SPINNER}
										/>
									)}
									Buy
								</Button>
							</div>
						))}
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

export { AddSenderDialog }

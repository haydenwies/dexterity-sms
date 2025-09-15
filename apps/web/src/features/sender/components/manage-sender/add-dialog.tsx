"use client"

import { useEffect, useState } from "react"

import { Button } from "@repo/ui/components/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"
import { Icon, IconName } from "@repo/ui/components/icon"

import { useAddSender } from "~/features/sender/hooks/use-add-sender"
import { useGetAvailablePhones } from "~/features/sender/hooks/use-get-available-phones"

type AddSenderDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const AddSenderDialog = ({ open, setOpen }: AddSenderDialogProps) => {
	const { loading: searchLoading, handleGetAvailablePhones } = useGetAvailablePhones()
	const { loading: buyLoading, selectedPhone, handleAddSender } = useAddSender()

	const [availableSenders, setAvailableSenders] = useState<string[]>([])

	useEffect(() => {
		const run = async () => {
			if (!open) return

			const res = await handleGetAvailablePhones()
			if (res) setAvailableSenders(res)
		}

		run()
	}, [handleGetAvailablePhones, open])

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (!buyLoading) setOpen(o)
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a phone number</DialogTitle>
					<DialogDescription>Choose a phone number to add to your organization</DialogDescription>
				</DialogHeader>
				{searchLoading ? (
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
									disabled={buyLoading}
									onClick={() => handleAddSender(sender)}
									variant="outline"
								>
									{buyLoading && selectedPhone === sender && (
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

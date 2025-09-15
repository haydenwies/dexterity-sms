"use client"

import { useEffect, useState } from "react"

import { Button } from "@repo/ui/components/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"
import { Icon, IconName } from "@repo/ui/components/icon"

import { useBuySender } from "~/features/sender/manage-sender/hooks/use-buy-sender"
import { useSearchAvailableSenders } from "~/features/sender/manage-sender/hooks/use-search-available-senders"

type BuySenderDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}

const BuySenderDialog = ({ open, setOpen }: BuySenderDialogProps) => {
	const { loading: searchLoading, handleSearchAvailableSenders } = useSearchAvailableSenders()
	const { loading: buyLoading, selectedPhone, handleBuySender } = useBuySender()

	const [availableSenders, setAvailableSenders] = useState<string[]>([])

	useEffect(() => {
		const run = async () => {
			if (!open) return

			const res = await handleSearchAvailableSenders()
			if (res) setAvailableSenders(res)
		}

		run()
	}, [handleSearchAvailableSenders, open])

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
									onClick={() => handleBuySender(sender)}
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

export { BuySenderDialog }

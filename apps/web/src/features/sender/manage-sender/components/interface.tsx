"use client"

import { use, useState } from "react"

import { SenderModel } from "@repo/types/sender"
import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { BuySenderDialog } from "~/features/sender/manage-sender/components/buy-dialog"
import { ReleaseSenderDialog } from "~/features/sender/manage-sender/components/release-dialog"

type Props = {
	senderPromise: Promise<SenderModel | undefined>
}

const ManageSenderInterface = ({ senderPromise }: Props) => {
	const sender = use(senderPromise)

	const [buySenderDialogOpen, setBuySenderDialogOpen] = useState<boolean>(false)
	const [releaseSenderDialogOpen, setReleaseSenderDialogOpen] = useState<boolean>(false)

	if (!sender)
		return (
			<div className="flex items-center justify-center">
				<Button
					onClick={() => setBuySenderDialogOpen(true)}
					variant="ghost"
				>
					<Icon name={IconName.PLUS} />
					Add a phone number
				</Button>
				<BuySenderDialog
					open={buySenderDialogOpen}
					setOpen={setBuySenderDialogOpen}
				/>
			</div>
		)

	return (
		<div className="flex items-center gap-2">
			<Icon
				className="text-muted-foreground"
				name={IconName.PHONE}
			/>
			<p>{sender.value}</p>
			<Button
				className="ml-auto"
				onClick={() => setReleaseSenderDialogOpen(true)}
				size="iconSm"
				variant="destructive"
			>
				<Icon name={IconName.TRASH} />
			</Button>
			<ReleaseSenderDialog
				sender={sender}
				open={releaseSenderDialogOpen}
				setOpen={setReleaseSenderDialogOpen}
			/>
		</div>
	)
}

export { ManageSenderInterface }

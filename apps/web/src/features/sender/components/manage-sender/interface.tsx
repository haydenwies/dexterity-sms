"use client"

import { use, useState } from "react"

import { SenderModel } from "@dexterity-sms/core/sender"
import { Button } from "@dexterity-sms/ui/components/button"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"

import { AddSenderDialog } from "~/features/sender/components/manage-sender/add-dialog"
import { RemoveSenderDialog } from "~/features/sender/components/manage-sender/remove-dialog"

type ManageSenderInterfaceProps = {
	senderPromise: Promise<SenderModel | undefined>
}
const ManageSenderInterface = ({ senderPromise }: ManageSenderInterfaceProps) => {
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
				<AddSenderDialog
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
			<RemoveSenderDialog
				sender={sender}
				open={releaseSenderDialogOpen}
				setOpen={setReleaseSenderDialogOpen}
			/>
		</div>
	)
}

export { ManageSenderInterface }

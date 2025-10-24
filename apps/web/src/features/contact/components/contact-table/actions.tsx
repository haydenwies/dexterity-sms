"use client"

import { useState } from "react"

import { type ContactModel } from "@dexterity-sms/core/contact"
import { Button } from "@dexterity-sms/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@dexterity-sms/ui/components/dropdown-menu"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"

import { ContactTableDeleteDialog } from "~/features/contact/components/contact-table/delete-dialog"
import { ContactTableUpdateDialog } from "~/features/contact/components/contact-table/update-dialog"

type ContactTableActionsProps =
	| { type: "header"; data: { contacts: ContactModel[] } }
	| { type: "cell"; data: { contact: ContactModel } }
const ContactTableActions = ({ type, data }: ContactTableActionsProps) => {
	const [updateOpen, setUpdateOpen] = useState<boolean>(false)
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					disabled={type === "header" && data.contacts.length === 0}
					variant="ghost"
					size="icon"
				>
					<Icon name={IconName.ELLIPSIS} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{type === "cell" && (
					<DropdownMenuItem onClick={() => setUpdateOpen(true)}>
						<Icon name={IconName.EDIT} />
						Edit
					</DropdownMenuItem>
				)}
				{type === "cell" && <DropdownMenuSeparator />}
				<DropdownMenuItem
					onClick={() => setDeleteOpen(true)}
					variant="destructive"
				>
					<Icon name={IconName.TRASH} />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
			{type === "cell" && (
				<ContactTableUpdateDialog
					contact={data.contact}
					open={updateOpen}
					setOpen={setUpdateOpen}
				/>
			)}
			<ContactTableDeleteDialog
				contacts={type === "header" ? data.contacts : [data.contact]}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
		</DropdownMenu>
	)
}

export { ContactTableActions }

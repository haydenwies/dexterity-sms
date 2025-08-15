"use client"

import { useState } from "react"

import { type ContactModel, type ContactTagModel } from "@repo/types/contact"
import { Button } from "@repo/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { AllContactsTableDeleteDialog } from "~/features/contact/all-contacts-table/components/delete-dialog"
import { AllContactsTableUpdateDialog } from "~/features/contact/all-contacts-table/components/update-dialog"
import { ManageContactTagsDialog } from "./manage-tags-dialog"

type Props =
	| { type: "header"; data: { contacts: ContactModel[]; contactTags: ContactTagModel[] } }
	| { type: "cell"; data: { contact: ContactModel; contactTags: ContactTagModel[] } }

const AllContactsTableActions = ({ type, data }: Props) => {
	const [updateOpen, setUpdateOpen] = useState<boolean>(false)
	const [manageTagsOpen, setManageTagsOpen] = useState<boolean>(false)
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
				<DropdownMenuItem onClick={() => setManageTagsOpen(true)}>
					<Icon name={IconName.TAG} />
					Manage Tags
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => setDeleteOpen(true)}
					variant="destructive"
				>
					<Icon name={IconName.TRASH} />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
			{type === "cell" && (
				<AllContactsTableUpdateDialog
					contact={data.contact}
					open={updateOpen}
					setOpen={setUpdateOpen}
				/>
			)}
			<ManageContactTagsDialog
				open={manageTagsOpen}
				setOpen={setManageTagsOpen}
				contacts={type === "header" ? data.contacts : [data.contact]}
				contactTags={data.contactTags}
			/>
			<AllContactsTableDeleteDialog
				contacts={type === "header" ? data.contacts : [data.contact]}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
		</DropdownMenu>
	)
}

export { AllContactsTableActions }

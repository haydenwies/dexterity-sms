"use client"

import { useState } from "react"

import { ContactModel } from "@repo/types/contact"
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

type Props = {
	contact: ContactModel
}

const AllContactsTableCellActions = ({ contact }: Props) => {
	const [updateOpen, setUpdateOpen] = useState<boolean>(false)
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
				>
					<Icon name={IconName.ELLIPSIS} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setUpdateOpen(true)}>
					<Icon name={IconName.EDIT} />
					Edit
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
			<AllContactsTableUpdateDialog
				contact={contact}
				open={updateOpen}
				setOpen={setUpdateOpen}
			/>
			<AllContactsTableDeleteDialog
				contacts={[contact]}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
		</DropdownMenu>
	)
}

export { AllContactsTableCellActions }

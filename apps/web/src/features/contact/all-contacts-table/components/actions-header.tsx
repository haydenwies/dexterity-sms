"use client"

import { useState } from "react"

import { type ContactModel } from "@repo/types/contact"
import { Button } from "@repo/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { AllContactsTableDeleteDialog } from "~/features/contact/all-contacts-table/components/delete-dialog"

type Props = {
	contacts: ContactModel[]
}

const AllContactsTableHeaderActions = ({ contacts }: Props) => {
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					disabled={contacts.length === 0}
					variant="ghost"
					size="icon"
				>
					<Icon name={IconName.ELLIPSIS} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => setDeleteOpen(true)}
					variant="destructive"
				>
					<Icon name={IconName.TRASH} />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
			<AllContactsTableDeleteDialog
				contacts={contacts}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
		</DropdownMenu>
	)
}

export { AllContactsTableHeaderActions }

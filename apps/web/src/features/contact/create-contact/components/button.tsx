"use client"

import { useState } from "react"

import { Button } from "@repo/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { CreateContactDialog } from "~/features/contact/create-contact/components/create-dialog"
import { UploadContactCsvDialog } from "~/features/contact/create-contact/components/upload-csv-dialog"

const CreateContactButton = () => {
	const [manualOpen, setManualOpen] = useState<boolean>(false)
	const [csvOpen, setCsvOpen] = useState<boolean>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button onClick={() => setManualOpen(true)}>
					<Icon name={IconName.PLUS} />
					Add Contacts
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setManualOpen(true)}>
					<Icon name={IconName.CREATE} />
					Manual
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setCsvOpen(true)}>
					<Icon name={IconName.FILE_UPLOAD} />
					CSV
				</DropdownMenuItem>
			</DropdownMenuContent>
			<CreateContactDialog
				open={manualOpen}
				setOpen={setManualOpen}
			/>
			<UploadContactCsvDialog
				open={csvOpen}
				setOpen={setCsvOpen}
			/>
		</DropdownMenu>
	)
}

export { CreateContactButton }

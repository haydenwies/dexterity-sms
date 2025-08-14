"use client"

import { type ContactModel } from "@repo/types/contact"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@repo/ui/components/alert-dialog"

import { useDeleteManyContacts } from "~/features/contact/all-contacts-table/hooks/use-delete-many-contacts"

type Props = {
	contacts: ContactModel[]
	open: boolean
	setOpen: (open: boolean) => void
}

const AllContactsTableDeleteDialog = ({ contacts, open, setOpen }: Props) => {
	const { handleSubmit, loading } = useDeleteManyContacts()

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Contact{contacts.length > 1 && "s"}</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete {contacts.length} contact{contacts.length > 1 && "s"}? This
						action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={async (e) => {
							e.preventDefault()
							await handleSubmit(
								contacts.map((contact) => contact.id),
								{ onSuccess: () => setOpen(false) }
							)
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { AllContactsTableDeleteDialog }

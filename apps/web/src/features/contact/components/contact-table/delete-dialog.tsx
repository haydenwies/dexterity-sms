"use client"

import { type ContactModel } from "@dexterity-sms/core/contact"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@dexterity-sms/ui/components/alert-dialog"
import { Spinner } from "@dexterity-sms/ui/components/spinner"

import { useDeleteContact } from "~/features/contact/hooks/use-delete-contact"

type ContactTableDeleteDialogProps = {
	contacts: ContactModel[]
	open: boolean
	setOpen: (open: boolean) => void
}
const ContactTableDeleteDialog = ({ contacts, open, setOpen }: ContactTableDeleteDialogProps) => {
	const { loading, handleDeleteMany } = useDeleteContact()

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
							await handleDeleteMany(
								contacts.map((contact) => contact.id),
								{ onSuccess: () => setOpen(false) }
							)
						}}
						variant="destructive"
					>
						{loading && <Spinner />}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { ContactTableDeleteDialog }

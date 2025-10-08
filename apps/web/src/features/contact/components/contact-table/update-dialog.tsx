"use client"

import { type ContactModel } from "@repo/types/contact"
import { Button } from "@repo/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@repo/ui/components/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { PhoneInput } from "@repo/ui/components/phone-input"
import { Spinner } from "@repo/ui/components/spinner"

import { useUpdateContact } from "~/features/contact/hooks/use-update-contact"
import { PLACEHOLDERS } from "~/lib/placeholders"

type ContactTableUpdateDialogProps = {
	contact: ContactModel
	open: boolean
	setOpen: (open: boolean) => void
}
const ContactTableUpdateDialog = ({ contact, open, setOpen }: ContactTableUpdateDialogProps) => {
	const FORM_ID = "update-contact-form"

	const { loading, form, handleReset, handleUpdate } = useUpdateContact(contact)

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Contact</DialogTitle>
					<DialogDescription>Update the contact information for the selected contact.</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-4"
					id={FORM_ID}
				>
					<Form {...form}>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={PLACEHOLDERS.firstName}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={PLACEHOLDERS.lastName}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={PLACEHOLDERS.email}
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<PhoneInput
											{...field}
											placeholder={PLACEHOLDERS.phone}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Form>
				</form>
				<DialogFooter>
					<Button
						disabled={loading}
						onClick={handleReset}
						variant="outline"
					>
						<Icon name={IconName.RESET} />
						Reset
					</Button>
					<Button
						disabled={loading}
						form={FORM_ID}
						onClick={() => handleUpdate({ onSuccess: () => setOpen(false) })}
						type="submit"
					>
						{loading ? <Spinner /> : <Icon name={IconName.SAVE} />}
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { ContactTableUpdateDialog }

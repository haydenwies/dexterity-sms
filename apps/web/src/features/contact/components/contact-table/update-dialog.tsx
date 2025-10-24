"use client"

import { useId } from "react"

import { type ContactModel } from "@dexterity-sms/core/contact"
import { Button } from "@dexterity-sms/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@dexterity-sms/ui/components/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dexterity-sms/ui/components/form"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { Input } from "@dexterity-sms/ui/components/input"
import { PhoneInput } from "@dexterity-sms/ui/components/phone-input"
import { Spinner } from "@dexterity-sms/ui/components/spinner"

import { useUpdateContact } from "~/features/contact/hooks/use-update-contact"
import { PLACEHOLDERS } from "~/lib/placeholders"

type ContactTableUpdateDialogProps = {
	contact: ContactModel
	open: boolean
	setOpen: (open: boolean) => void
}
const ContactTableUpdateDialog = ({ contact, open, setOpen }: ContactTableUpdateDialogProps) => {
	const FORM_ID = useId()

	const { loading, form, handleReset, handleUpdate } = useUpdateContact(contact)

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Contact</DialogTitle>
					<DialogDescription>Update information for the selected contact.</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-4"
					id={FORM_ID}
					onSubmit={(e) => {
						e.preventDefault()
						handleUpdate({ onSuccess: () => setOpen(false) })
					}}
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
						disabled={loading || !form.formState.isDirty}
						form={FORM_ID}
						type="submit"
					>
						{loading && <Spinner />}
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { ContactTableUpdateDialog }

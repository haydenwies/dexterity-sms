"use client"

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
import { useState } from "react"

import { useCreateContact } from "~/features/contact/hooks/use-create-contact"
import { placeholders } from "~/lib/placeholders"

type CreateContactDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const CreateContactDialog = ({ open, setOpen }: CreateContactDialogProps) => {
	const { loading, form, handleReset, handleCreate } = useCreateContact()

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (loading) return
				setOpen(o)

				if (!o) handleReset()
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Contact</DialogTitle>
					<DialogDescription>Provide some information to create a new contact.</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-4">
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
											placeholder={placeholders.FIRST_NAME}
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
											placeholder={placeholders.LAST_NAME}
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
											placeholder={placeholders.EMAIL}
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
											defaultCountry="CA"
											placeholder={placeholders.PHONE}
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
						onClick={() =>
							handleCreate({
								onSuccess: () => {
									setOpen(false)
									handleReset()
								}
							})
						}
					>
						<Icon name={IconName.PLUS} />
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const CreateContactButton = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon name={IconName.PLUS} />
				Add contact
			</Button>
			<CreateContactDialog
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export { CreateContactButton }

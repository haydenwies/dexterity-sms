"use client"

import { useId, useState } from "react"

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

import { useCreateContact } from "~/features/contact/hooks/use-create-contact"
import { PLACEHOLDERS } from "~/lib/placeholders"

type CreateContactDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const CreateContactDialog = ({ open, setOpen }: CreateContactDialogProps) => {
	const FORM_ID = useId()

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
				<form
					className="flex flex-col gap-4"
					id={FORM_ID}
					onSubmit={(e) => {
						e.preventDefault()
						handleCreate({ onSuccess: () => setOpen(false) })
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
											defaultCountry="CA"
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
						onClick={() =>
							handleCreate({
								onSuccess: () => {
									setOpen(false)
									handleReset()
								}
							})
						}
						type="submit"
					>
						{loading && <Spinner />}
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
				New contact
			</Button>
			<CreateContactDialog
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export { CreateContactButton }

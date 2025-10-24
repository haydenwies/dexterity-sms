"use client"

import { useId } from "react"

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
import { Input } from "@dexterity-sms/ui/components/input"
import { Spinner } from "@dexterity-sms/ui/components/spinner"

import { useCreateOrganization } from "~/features/organization/hooks/use-create-organization"
import { PLACEHOLDERS } from "~/lib/placeholders"

type CreateOrganizationDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const CreateOrganizationDialog = ({ open, setOpen }: CreateOrganizationDialogProps) => {
	const FORM_ID = useId()

	const { loading, createOrganizationForm, handleCreateOrganization } = useCreateOrganization()

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create your organization</DialogTitle>
					<DialogDescription>
						Please provide a few details about your organization to get started. You will be able to edit
						these later.
					</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-4"
					id={FORM_ID}
					onSubmit={async (e) => {
						e.preventDefault()
						await handleCreateOrganization()
					}}
				>
					<Form {...createOrganizationForm}>
						<FormField
							control={createOrganizationForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={PLACEHOLDERS.organizationName}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createOrganizationForm.control}
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
					</Form>
				</form>
				<DialogFooter>
					<Button
						disabled={loading}
						form={FORM_ID}
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

export { CreateOrganizationDialog }

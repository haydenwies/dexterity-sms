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

import { useCreateOrganization } from "~/features/organization/hooks/use-create-organization"
import { placeholders } from "~/lib/placeholders"

type CreateOrganizationDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const CreateOrganizationDialog = ({ open, setOpen }: CreateOrganizationDialogProps) => {
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
				<form className="flex flex-col gap-4">
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
											placeholder={placeholders.ORGANIZATION_NAME}
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
											placeholder={placeholders.EMAIL}
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
						onClick={handleCreateOrganization}
					>
						{loading ? <Icon name={IconName.SPINNER} /> : <Icon name={IconName.PLUS} />}
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { CreateOrganizationDialog }

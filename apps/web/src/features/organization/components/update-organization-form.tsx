"use client"

import { use } from "react"

import { type OrganizationModel } from "@repo/types/organization"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useUpdateOrganization } from "~/features/organization/hooks/use-update-organization"
import { placeholders } from "~/lib/placeholders"

type UpdateOrganizationFormProps = {
	organizationPromise: Promise<OrganizationModel>
	className?: string
}
const UpdateOrganizationForm = ({ organizationPromise, className }: UpdateOrganizationFormProps) => {
	const organization = use(organizationPromise)

	const { updateOrganizationForm } = useUpdateOrganization(organization)

	return (
		<form className={cn("flex flex-col gap-4", className)}>
			<Form {...updateOrganizationForm}>
				<FormField
					control={updateOrganizationForm.control}
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
					control={updateOrganizationForm.control}
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
	)
}

export { UpdateOrganizationForm }

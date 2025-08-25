"use client"

import { type OrganizationModel } from "@repo/types/organization"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import { use } from "react"

import { useUpdateOrganization } from "~/features/organization/organization-settings/hooks/use-update-organization"

type UpdateOrganizationFormProps = {
	organizationPromise: Promise<OrganizationModel>
	className?: string
}
const UpdateOrganizationForm = ({ organizationPromise, className }: UpdateOrganizationFormProps) => {
	const organization = use(organizationPromise)

	const { form } = useUpdateOrganization(organization)

	return (
		<Form {...form}>
			<form className={cn("flex flex-col gap-4", className)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export { UpdateOrganizationForm }

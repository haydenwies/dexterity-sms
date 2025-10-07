"use client"

import { use } from "react"

import { type OrganizationModel } from "@repo/types/organization"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@repo/ui/components/field"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { Skeleton } from "@repo/ui/components/skeleton"
import { useUpdateOrganization } from "~/features/organization/hooks/use-update-organization"
import { PLACEHOLDERS } from "~/lib/placeholders"

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
									placeholder={PLACEHOLDERS.organizationName}
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
	)
}

type UpdateOrganizationFormSkeletonProps = {
	className?: string
}
const UpdateOrganizationFormSkeleton = ({ className }: UpdateOrganizationFormSkeletonProps) => {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<FieldSet>
				<FieldGroup>
					<Field>
						<FieldLabel>Name</FieldLabel>
						<Skeleton className="h-10 w-full" />
					</Field>
					<Field>
						<FieldLabel>Email</FieldLabel>
						<Skeleton className="h-10 w-full" />
					</Field>
				</FieldGroup>
			</FieldSet>
		</div>
	)
}

export { UpdateOrganizationForm, UpdateOrganizationFormSkeleton }

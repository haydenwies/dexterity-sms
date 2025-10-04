import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import {
	type OrganizationModel,
	type UpdateOrganizationDto,
	updateOrganizationDtoSchema
} from "@repo/types/organization"
import { toast } from "@repo/ui/components/sonner"

import { updateOrganization } from "~/actions/organization/update-organization"

const useUpdateOrganization = (organization: OrganizationModel) => {
	const [loading, setLoading] = useState<boolean>(false)

	const updateOrganizationForm = useForm<UpdateOrganizationDto>({
		resolver: zodResolver(updateOrganizationDtoSchema),
		defaultValues: {
			name: organization.name,
			email: organization.email
		}
	})

	const handleUpdateOrganization = updateOrganizationForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			await updateOrganization(organization.id, data)
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return {
		loading,
		updateOrganizationForm,
		handleUpdateOrganization
	}
}

export { useUpdateOrganization }

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import {
	type OrganizationModel,
	type UpdateOrganizationDto,
	updateOrganizationDtoSchema
} from "@repo/types/organization"

import { updateOrganization } from "~/actions/organization/update-organization"

const useUpdateOrganization = (organization: OrganizationModel) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const updateOrganizationForm = useForm<UpdateOrganizationDto>({
		resolver: zodResolver(updateOrganizationDtoSchema),
		defaultValues: {
			name: organization.name
		}
	})

	const handleUpdateOrganization = updateOrganizationForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			await updateOrganization(organization.id, data)
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return {
		loading,
		error,
		updateOrganizationForm,
		handleUpdateOrganization
	}
}

export { useUpdateOrganization }

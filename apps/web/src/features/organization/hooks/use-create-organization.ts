import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type CreateOrganizationDto, createOrganizationDtoSchema } from "@repo/types/organization/dto"

import { createOrganization } from "~/actions/organization/create-organization"

const useCreateOrganization = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const createOrganizationForm = useForm<CreateOrganizationDto>({
		resolver: zodResolver(createOrganizationDtoSchema),
		defaultValues: {
			name: ""
		}
	})

	const handleCreateOrganization = createOrganizationForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			await createOrganization(data)
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return {
		loading,
		error,
		createOrganizationForm,
		handleCreateOrganization
	}
}

export { useCreateOrganization }

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type CreateOrganizationDto, createOrganizationDtoSchema } from "@repo/types/organization"
import { toast } from "@repo/ui/components/sonner"

import { createOrganization } from "~/actions/organization/create-organization"

const useCreateOrganization = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const createOrganizationForm = useForm<CreateOrganizationDto>({
		resolver: zodResolver(createOrganizationDtoSchema),
		defaultValues: {
			name: "",
			email: ""
		}
	})

	const handleCreateOrganization = createOrganizationForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			await createOrganization(data)
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return {
		loading,
		createOrganizationForm,
		handleCreateOrganization
	}
}

export { useCreateOrganization }

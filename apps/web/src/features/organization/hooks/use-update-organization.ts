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

		const res = await updateOrganization(organization.id, data)
		if (!res.success) {
			toast.error(res.error)
			return
		}

		setLoading(false)
	})

	return {
		loading,
		updateOrganizationForm,
		handleUpdateOrganization
	}
}

export { useUpdateOrganization }

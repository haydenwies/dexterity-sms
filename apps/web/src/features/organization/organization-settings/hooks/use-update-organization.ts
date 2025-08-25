import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type OrganizationModel } from "@repo/types/organization"
import {
	updateOrganizationDtoSchema,
	type UpdateOrganizationDto
} from "@repo/types/organization/dto/update-organization"

const useUpdateOrganization = (organization: OrganizationModel) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<UpdateOrganizationDto>({
		resolver: zodResolver(updateOrganizationDtoSchema),
		defaultValues: {
			name: organization.name
		}
	})

	return {
		loading,
		error,
		form
	}
}

export { useUpdateOrganization }

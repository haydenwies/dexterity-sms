import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type CreateContactDto, createContactDtoSchema } from "@repo/types/contact/dto"

import { createContact } from "~/actions/contact/create-contact"

const useCreateContact = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const form = useForm<CreateContactDto>({
		resolver: zodResolver(createContactDtoSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: ""
		}
	})

	const handleReset = () => {
		form.reset()
	}

	type HandleCreateConfig = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleCreate = async ({ onError, onSuccess }: HandleCreateConfig) => {
		form.handleSubmit(async (data) => {
			setLoading(true)

			try {
				const organizationId = params.organizationId
				if (!organizationId || Array.isArray(organizationId)) throw new Error("Organization ID is required")

				await createContact(organizationId, data)
				onSuccess?.()
			} catch {
				setError("An unknown error occurred")
				onError?.()
			} finally {
				setLoading(false)
			}
		})()
	}

	return { loading, error, form, handleReset, handleCreate }
}

export { useCreateContact }

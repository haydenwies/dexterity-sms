import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ContactModel, type UpdateContactDto, updateContactDtoSchema } from "@repo/types/contact"

import { updateContact } from "~/actions/contact/update-contact"

const useUpdateContact = (contact: ContactModel) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const params = useParams()

	const form = useForm<UpdateContactDto>({
		resolver: zodResolver(updateContactDtoSchema),
		defaultValues: {
			firstName: contact.firstName || "",
			lastName: contact.lastName || "",
			email: contact.email || "",
			phone: contact.phone || ""
		}
	})

	const handleReset = () => {
		form.reset()
	}

	type HandleUpdateConfig = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleUpdate = async ({ onError, onSuccess }: HandleUpdateConfig) => {
		form.handleSubmit(async (data) => {
			setLoading(true)

			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) {
				setError("Organization ID is required")
				onError?.()
				return
			}

			try {
				await updateContact(organizationId, contact.id, data)
				onSuccess?.()
			} catch {
				setError("An unknown error occurred")
				onError?.()
			} finally {
				setLoading(false)
			}
		})()
	}

	return { loading, error, form, handleReset, handleUpdate }
}

export { useUpdateContact }

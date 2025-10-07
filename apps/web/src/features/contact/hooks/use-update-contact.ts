import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ContactModel, type UpdateContactDto, updateContactDtoSchema } from "@repo/types/contact"
import { toast } from "@repo/ui/components/sonner"

import { updateContact } from "~/actions/contact/update-contact"

const useUpdateContact = (contact: ContactModel) => {
	const [loading, setLoading] = useState<boolean>(false)

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

			if (!params.organizationId || Array.isArray(params.organizationId)) {
				toast.error("Organization ID is required")
				return
			}

			const res = await updateContact(params.organizationId, contact.id, data)
			if (!res.success) {
				toast.error(res.error)
				onError?.()
				return
			}

			onSuccess?.()

			setLoading(false)
		})()
	}

	return { loading, form, handleReset, handleUpdate }
}

export { useUpdateContact }

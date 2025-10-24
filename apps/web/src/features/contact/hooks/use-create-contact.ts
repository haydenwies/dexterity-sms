import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type CreateContactDto, createContactDtoSchema } from "@dexterity-sms/core/contact"
import { toast } from "@dexterity-sms/ui/components/sonner"

import { createContact } from "~/actions/contact/create-contact"

const useCreateContact = () => {
	const [loading, setLoading] = useState<boolean>(false)

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

			if (!params.organizationId || Array.isArray(params.organizationId)) {
				toast.error("Organization ID is required")
				onError?.()
				setLoading(false)
				return
			}

			const res = await createContact(params.organizationId, data)
			if (!res.success) {
				toast.error(res.error)
				onError?.()
				setLoading(false)
				return
			}

			onSuccess?.()

			setLoading(false)
		})()
	}

	return { loading, form, handleReset, handleCreate }
}

export { useCreateContact }

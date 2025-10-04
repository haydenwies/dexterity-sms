import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type CreateContactDto, createContactDtoSchema } from "@repo/types/contact"
import { toast } from "@repo/ui/components/sonner"

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

			try {
				if (!params.organizationId || Array.isArray(params.organizationId))
					throw new Error("Organization ID is required")

				await createContact(params.organizationId, data)
				onSuccess?.()
			} catch (err: unknown) {
				if (err instanceof Error) toast.error(err.message)
				else toast.error("An unknown error occurred")

				onError?.()
			} finally {
				setLoading(false)
			}
		})()
	}

	return { loading, form, handleReset, handleCreate }
}

export { useCreateContact }

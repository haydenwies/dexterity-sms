import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type CreateContactDto, createContactDtoSchema } from "@repo/types/contact/dto/create-contact"

import { useState } from "react"
import { createContact } from "~/actions/contact/create-contact"

type HandleSubmitConfig = {
	onSuccess?: () => void
	resetOnSuccess?: boolean
}

const useCreateContact = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

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

	const handleSubmit = async ({ onSuccess, resetOnSuccess = true }: HandleSubmitConfig = {}) => {
		form.handleSubmit(async (data) => {
			setLoading(true)

			try {
				const res = await createContact(data)
				if (!res.success) {
					setError(res.message)
					return
				}

				if (resetOnSuccess) handleReset()
				onSuccess?.()
			} catch {
				setError("An unknown error occurred")
			} finally {
				setLoading(false)
			}
		})()
	}

	return { loading, error, form, handleReset, handleSubmit }
}

export { useCreateContact }

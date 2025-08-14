import { zodResolver } from "@hookform/resolvers/zod"
import { type ContactModel } from "@repo/types/contact"
import { UpdateContactDto, updateContactDtoSchema } from "@repo/types/contact/dto/update-contact"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { updateContact } from "~/actions/contact/update-contact"

type HandleSubmitConfig = {
	onSuccess?: () => void
	resetOnSuccess?: boolean
}

const useUpdateContact = (contact: ContactModel) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<UpdateContactDto>({
		resolver: zodResolver(updateContactDtoSchema),
		defaultValues: {
			firstName: contact.firstName,
			lastName: contact.lastName,
			email: contact.email,
			phone: contact.phone
		}
	})

	const handleReset = () => {
		form.reset()
	}

	const handleSubmit = async ({ onSuccess, resetOnSuccess = true }: HandleSubmitConfig = {}) => {
		form.handleSubmit(async (data) => {
			setLoading(true)

			try {
				const res = await updateContact(contact.id, data)
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

export { useUpdateContact }

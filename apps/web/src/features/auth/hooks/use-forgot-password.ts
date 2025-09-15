import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ForgotPasswordDto, forgotPasswordDtoSchema } from "@repo/types/auth"

import { forgotPassword } from "~/actions/auth/forgot-password"

const useForgotPassword = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [submitted, setSubmitted] = useState<boolean>(false)

	const forgotPasswordForm = useForm<ForgotPasswordDto>({
		resolver: zodResolver(forgotPasswordDtoSchema),
		defaultValues: {
			email: ""
		}
	})

	const handleForgotPassword = forgotPasswordForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const res = await forgotPassword(data)
			if (!res.success) {
				setError(res.message)
				return
			}

			setSubmitted(true)
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, submitted, forgotPasswordForm, handleForgotPassword }
}

export { useForgotPassword }

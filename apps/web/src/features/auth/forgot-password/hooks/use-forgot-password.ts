import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ForgotPasswordDto, forgotPasswordDtoSchema } from "@repo/types/auth/dto/forgot-password"
import { useState } from "react"
import { forgotPassword } from "~/actions/auth/forgot-password"

const useForgotPassword = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const forgotPasswordForm = useForm<ForgotPasswordDto>({
		resolver: zodResolver(forgotPasswordDtoSchema),
		defaultValues: {
			email: ""
		}
	})

	const handleSubmit = forgotPasswordForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const res = await forgotPassword(data)
			if (!res.success) {
				setError(res.message)
				return
			}
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, forgotPasswordForm, handleSubmit }
}

export { useForgotPassword }

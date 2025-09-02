import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "@repo/types/auth/dto/reset-password"

import { resetPassword } from "~/actions/auth/reset-password"

const useResetPassword = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const resetPasswordForm = useForm<ResetPasswordDto>({
		resolver: zodResolver(resetPasswordDtoSchema),
		defaultValues: {
			password: "",
			confirmPassword: ""
		}
	})

	const handleSubmit = resetPasswordForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const res = await resetPassword(data)
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

	return { loading, error, resetPasswordForm, handleSubmit }
}

export { useResetPassword }

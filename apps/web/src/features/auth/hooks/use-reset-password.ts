import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "@repo/types/auth"

import { resetPassword } from "~/actions/auth/reset-password"

const useResetPassword = (token: string) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const resetPasswordForm = useForm<ResetPasswordDto>({
		resolver: zodResolver(resetPasswordDtoSchema),
		defaultValues: {
			token,
			password: "",
			confirmPassword: ""
		}
	})

	const handleResetPassword = resetPasswordForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			await resetPassword(data)
		} catch (err: unknown) {
			if (err instanceof Error) setError(err.message)
			else setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, resetPasswordForm, handleResetPassword }
}

export { useResetPassword }

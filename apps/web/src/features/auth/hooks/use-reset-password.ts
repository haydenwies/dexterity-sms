import { zodResolver } from "@hookform/resolvers/zod"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "@repo/types/auth"
import { toast } from "@repo/ui/components/sonner"

import { resetPassword } from "~/actions/auth/reset-password"

const useResetPassword = (token: string) => {
	const [loading, setLoading] = useState<boolean>(false)

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
			if (isRedirectError(err)) return
			else if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, resetPasswordForm, handleResetPassword }
}

export { useResetPassword }

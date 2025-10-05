import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ForgotPasswordDto, forgotPasswordDtoSchema } from "@repo/types/auth"
import { toast } from "@repo/ui/components/sonner"

import { forgotPassword } from "~/actions/auth/forgot-password"

const useForgotPassword = () => {
	const [loading, setLoading] = useState<boolean>(false)
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
			await forgotPassword(data)
			setSubmitted(true)
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, submitted, forgotPasswordForm, handleForgotPassword }
}

export { useForgotPassword }

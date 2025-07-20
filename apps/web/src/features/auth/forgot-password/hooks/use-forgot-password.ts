import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type ForgotPasswordSchema, forgotPasswordSchema } from "~/types/dtos/auth/forgot-password.dto"

const useForgotPassword = () => {
	const forgotPasswordForm = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: ""
		}
	})

	const handleSubmit = forgotPasswordForm.handleSubmit((data) => {
		console.log(data)
	})

	return { forgotPasswordForm, handleSubmit }
}

export { useForgotPassword }

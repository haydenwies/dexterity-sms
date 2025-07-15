import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ForgotPasswordSchema, forgotPasswordSchema } from "../schema/forgot-password.schema"

export const useForgotPassword = () => {
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

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ResetPasswordSchema, resetPasswordSchema } from "~/features/auth/schema/reset-password.schema"

export const useResetPassword = () => {
	const resetPasswordForm = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: ""
		}
	})

	const handleSubmit = resetPasswordForm.handleSubmit((data) => {
		console.log(data)
	})

	return { resetPasswordForm, handleSubmit }
}

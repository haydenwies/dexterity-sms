import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	type ResetPasswordSchema,
	resetPasswordSchema
} from "~/features/auth/reset-password/schema/reset-password.schema"

const useResetPassword = () => {
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

export { useResetPassword }

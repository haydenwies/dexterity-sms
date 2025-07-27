import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "~/types/auth/dtos/reset-password.dto"

const useResetPassword = () => {
	const resetPasswordForm = useForm<ResetPasswordDto>({
		resolver: zodResolver(resetPasswordDtoSchema),
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

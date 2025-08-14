import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "@repo/types/auth/dto/reset-password"

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

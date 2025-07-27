import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type ForgotPasswordDto, forgotPasswordDtoSchema } from "~/types/auth/dtos/forgot-password.dto"

const useForgotPassword = () => {
	const forgotPasswordForm = useForm<ForgotPasswordDto>({
		resolver: zodResolver(forgotPasswordDtoSchema),
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

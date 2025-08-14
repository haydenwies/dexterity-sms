import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ForgotPasswordDto, forgotPasswordDtoSchema } from "@repo/types/auth/dto/forgot-password"

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

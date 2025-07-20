import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type SignUpSchema, signUpSchema } from "~/types/dtos/auth/sign-up.dto"

const useSignUp = () => {
	const signUpForm = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: ""
		}
	})

	const handleSubmit = signUpForm.handleSubmit((data) => {
		console.log(data)
	})

	return { signUpForm, handleSubmit }
}

export { useSignUp }

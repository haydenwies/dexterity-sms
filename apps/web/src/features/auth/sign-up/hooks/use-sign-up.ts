import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type SignUpDto, signUpDtoSchema } from "~/types/auth/dtos/sign-up.dto"

const useSignUp = () => {
	const signUpForm = useForm<SignUpDto>({
		resolver: zodResolver(signUpDtoSchema),
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

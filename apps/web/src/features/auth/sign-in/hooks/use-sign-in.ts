import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { SignInDto, signInDtoSchema } from "~/types/auth/dtos/sign-in.dto"

const useSignIn = () => {
	const signInForm = useForm({
		resolver: zodResolver(signInDtoSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const handleSubmit = signInForm.handleSubmit((data: SignInDto) => {
		console.log(data)
	})

	return {
		signInForm,
		handleSubmit
	}
}

export { useSignIn }

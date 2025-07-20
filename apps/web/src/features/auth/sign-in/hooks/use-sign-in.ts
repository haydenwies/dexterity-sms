import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { SignInSchema, signInSchema } from "~/types/dtos/auth/sign-in.dto"

const useSignIn = () => {
	const signInForm = useForm({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const handleSubmit = signInForm.handleSubmit((data: SignInSchema) => {
		console.log(data)
	})

	return {
		signInForm,
		handleSubmit
	}
}

export { useSignIn }

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type SignInDto, signInDtoSchema } from "@repo/types/auth/dto/sign-in"

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

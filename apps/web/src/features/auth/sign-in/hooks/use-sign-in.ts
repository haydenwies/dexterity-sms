import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { SignInSchema, signInSchema } from "~/features/auth/sign-in/schema/sign-in.schema"

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

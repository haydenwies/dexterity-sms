import { useForm } from "react-hook-form"
import { SignInSchema, signInSchema } from "../schema/sign-in.schema"
import { zodResolver } from "@hookform/resolvers/zod"

export const useSignIn = () => {
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

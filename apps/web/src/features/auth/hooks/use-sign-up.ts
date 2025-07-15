import { useForm } from "react-hook-form"
import { SignUpSchema, signUpSchema } from "../schema/sign-up.schema"
import { zodResolver } from "@hookform/resolvers/zod"

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

export default useSignUp

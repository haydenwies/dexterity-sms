import { zodResolver } from "@hookform/resolvers/zod"
import { type SignUpDto, signUpDtoSchema } from "@repo/types/auth/dto/sign-up"
import { useForm } from "react-hook-form"

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

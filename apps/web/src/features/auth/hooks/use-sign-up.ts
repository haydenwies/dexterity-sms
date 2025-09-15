import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SignUpDto, signUpDtoSchema } from "@repo/types/auth"

import { signUp } from "~/actions/auth/sign-up"

const useSignUp = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const signUpForm = useForm<SignUpDto>({
		resolver: zodResolver(signUpDtoSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: ""
		}
	})

	const handleSignUp = signUpForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			const res = await signUp(data)
			if (!res.success) {
				setError(res.message)
				return
			}
		} catch {
			setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, signUpForm, handleSignUp }
}

export { useSignUp }

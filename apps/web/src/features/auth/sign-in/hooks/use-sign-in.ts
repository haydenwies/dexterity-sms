import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SignInDto, signInDtoSchema } from "@repo/types/auth/dto/sign-in"

import { signIn } from "~/actions/auth/sign-in"

const useSignIn = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const signInForm = useForm<SignInDto>({
		resolver: zodResolver(signInDtoSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const handleSubmit = signInForm.handleSubmit(async (data: SignInDto) => {
		setLoading(true)

		try {
			const res = await signIn(data)
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

	return { loading, error, signInForm, handleSubmit }
}

export { useSignIn }

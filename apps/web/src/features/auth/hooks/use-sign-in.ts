import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SignInDto, signInDtoSchema } from "@repo/types/auth"

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

	const handleSignIn = signInForm.handleSubmit(async (data: SignInDto) => {
		setLoading(true)

		try {
			await signIn(data)
		} catch (err: unknown) {
			if (err instanceof Error) setError(err.message)
			else setError("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, error, signInForm, handleSignIn }
}

export { useSignIn }

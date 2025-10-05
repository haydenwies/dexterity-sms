import { zodResolver } from "@hookform/resolvers/zod"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SignUpDto, signUpDtoSchema } from "@repo/types/auth"
import { toast } from "@repo/ui/components/sonner"

import { signUp } from "~/actions/auth/sign-up"

const useSignUp = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const signUpForm = useForm<SignUpDto>({
		resolver: zodResolver(signUpDtoSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	})

	const handleSignUp = signUpForm.handleSubmit(async (data) => {
		setLoading(true)

		try {
			await signUp(data)
		} catch (err: unknown) {
			if (isRedirectError(err)) return
			else if (err instanceof Error) toast.error(err.message)
			else toast.error("An unknown error occurred")
		} finally {
			setLoading(false)
		}
	})

	return { loading, signUpForm, handleSignUp }
}

export { useSignUp }

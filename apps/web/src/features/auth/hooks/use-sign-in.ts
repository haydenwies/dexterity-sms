import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type SignInDto, signInDtoSchema } from "@repo/types/auth"
import { toast } from "@repo/ui/components/sonner"

import { signIn } from "~/actions/auth/sign-in"

const useSignIn = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const signInForm = useForm<SignInDto>({
		resolver: zodResolver(signInDtoSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const handleSignIn = signInForm.handleSubmit(async (data: SignInDto) => {
		setLoading(true)

		const res = await signIn(data)
		if (!res.success) {
			toast.error(res.error)
		}

		setLoading(false)
	})

	return { loading, signInForm, handleSignIn }
}

export { useSignIn }

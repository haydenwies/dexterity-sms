import { zodResolver } from "@hookform/resolvers/zod"
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

		const res = await signUp(data)
		if (!res.success) {
			toast.error(res.error)
		}

		setLoading(false)
	})

	return { loading, signUpForm, handleSignUp }
}

export { useSignUp }

import z from "zod"

const signUpSchema = z
	.object({
		email: z.email("Invalid email address").trim().toLowerCase(),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	})

type SignUpSchema = z.infer<typeof signUpSchema>

export { signUpSchema, type SignUpSchema }

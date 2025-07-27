import z from "zod"

type SignUpDto = {
	email: string
	password: string
	confirmPassword: string
}

const signUpDtoSchema = z
	.object({
		email: z.email("Invalid email address").trim().toLowerCase(),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	})

export { type SignUpDto, signUpDtoSchema }

import z from "zod"

type ResetPasswordDto = {
	password: string
	confirmPassword: string
}

const resetPasswordDtoSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long")
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	})

export { type ResetPasswordDto, resetPasswordDtoSchema }

import z from "zod"

type ResetPasswordDto = {
	token: string
	password: string
	confirmPassword: string
}

const resetPasswordDtoSchema = z
	.object({
		token: z.string().min(1, "Token cannot be empty"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long")
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	})

export { resetPasswordDtoSchema, type ResetPasswordDto }

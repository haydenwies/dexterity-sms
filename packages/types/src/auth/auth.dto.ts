import z from "zod"

// #region Sign In

type SignInDto = {
	email: string
	password: string
}

const signInDtoSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(1)
})

// #region Sign Up

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

// #region Forgot Password

type ForgotPasswordDto = {
	email: string
}

const forgotPasswordDtoSchema = z.object({
	email: z.email("Invalid email address").trim().toLowerCase()
})

// #region Reset Password

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

export {
	forgotPasswordDtoSchema,
	resetPasswordDtoSchema,
	signInDtoSchema,
	signUpDtoSchema,
	type ForgotPasswordDto,
	type ResetPasswordDto,
	type SignInDto,
	type SignUpDto
}

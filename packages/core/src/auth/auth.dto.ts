import z from "zod"

// #region UserDto

type UserDto = {
	id: string
	firstName?: string
	lastName?: string
	email: string
	createdAt: Date
	updatedAt: Date
}

// #endregion

// #region SessionDto

type SessionDto = {
	id: string
	userId: string
	organizationId?: string
	createdAt: Date
	updatedAt: Date
}

// #endregion

// #region SignInDto

type SignInDto = {
	email: string
	password: string
}

const signInDtoSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(1)
})

// #region SignUpDto

type SignUpDto = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

const signUpDtoSchema = z
	.object({
		email: z.email("Invalid email address").trim().toLowerCase(),
		firstName: z.string().min(1, "First name cannot be empty"),
		lastName: z.string().min(1, "Last name cannot be empty"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	})

// #region ForgotPasswordDto

type ForgotPasswordDto = {
	email: string
}

const forgotPasswordDtoSchema = z.object({
	email: z.email("Invalid email address").trim().toLowerCase()
})

// #region ResetPasswordDto

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
	type SessionDto,
	type SignInDto,
	type SignUpDto,
	type UserDto
}

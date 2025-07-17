import z from "zod"

const forgotPasswordSchema = z.object({
	email: z.email("Invalid email address").trim().toLowerCase()
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export { forgotPasswordSchema, type ForgotPasswordSchema }

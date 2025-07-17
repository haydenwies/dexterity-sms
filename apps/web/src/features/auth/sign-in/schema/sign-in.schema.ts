import z from "zod"

const signInSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(1)
})

type SignInSchema = z.infer<typeof signInSchema>

export { signInSchema, type SignInSchema }

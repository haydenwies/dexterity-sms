import z from "zod"

export const signInSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(1)
})

export type SignInSchema = z.infer<typeof signInSchema>

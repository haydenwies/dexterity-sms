import z from "zod"

type SignInDto = {
	email: string
	password: string
}

const signInDtoSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(1)
})

export { type SignInDto, signInDtoSchema }

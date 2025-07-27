import z from "zod"

type ForgotPasswordDto = {
	email: string
}

const forgotPasswordDtoSchema = z.object({
	email: z.email("Invalid email address").trim().toLowerCase()
})

export { type ForgotPasswordDto, forgotPasswordDtoSchema }

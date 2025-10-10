import { registerAs } from "@nestjs/config"
import z from "zod"

const emailConfigSchema = z.object({
	RESEND_API_KEY: z.string(),
	RESEND_FROM: z.string()
})

const emailConfig = registerAs("email", () => ({
	resendApiKey: process.env.RESEND_API_KEY,
	resendFrom: process.env.RESEND_FROM
}))

export { emailConfig, emailConfigSchema }

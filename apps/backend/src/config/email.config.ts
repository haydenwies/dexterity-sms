import { registerAs } from "@nestjs/config"
import z from "zod"

const emailConfigSchema = z.object({
	AWS_SES_ACCESS_KEY_ID: z.string(),
	AWS_SES_SECRET_ACCESS_KEY: z.string(),
	AWS_SES_SOURCE_EMAIL: z.string(),
	RESEND_API_KEY: z.string(),
	RESEND_FROM: z.string()
})

const emailConfig = registerAs("email", () => ({
	awsSesAccessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
	awsSesSecretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
	awsSesSourceEmail: process.env.AWS_SES_SOURCE_EMAIL,
	resendApiKey: process.env.RESEND_API_KEY,
	resendFrom: process.env.RESEND_FROM
}))

export { emailConfig, emailConfigSchema }

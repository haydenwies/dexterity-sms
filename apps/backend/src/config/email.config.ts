import { registerAs } from "@nestjs/config"
import z from "zod"

const emailConfigSchema = z.object({
	AWS_SES_ACCESS_KEY_ID: z.string(),
	AWS_SES_SECRET_ACCESS_KEY: z.string(),
	AWS_SES_SOURCE_EMAIL: z.string()
})

const emailConfig = registerAs("email", () => ({
	awsSesAccessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
	awsSesSecretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
	awsSesSourceEmail: process.env.AWS_SES_SOURCE_EMAIL
}))

export { emailConfig, emailConfigSchema }

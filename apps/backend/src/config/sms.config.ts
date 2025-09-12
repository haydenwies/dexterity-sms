import { registerAs } from "@nestjs/config"
import z from "zod"

const smsConfigSchema = z.object({
	TWILIO_ACCOUNT_SID: z.string(),
	TWILIO_AUTH_TOKEN: z.string()
})

const smsConfig = registerAs("sms", () => ({
	twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
	twilioAuthToken: process.env.TWILIO_AUTH_TOKEN
}))

export { smsConfig, smsConfigSchema }

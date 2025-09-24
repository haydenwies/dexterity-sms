import { registerAs } from "@nestjs/config"
import z from "zod"

const billingConfigSchema = z.object({
	STRIPE_API_KEY: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string()
})

const billingConfig = registerAs("billing", () => ({
	stripeApiKey: process.env.STRIPE_API_KEY,
	stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
}))

export { billingConfig, billingConfigSchema }

import { registerAs } from "@nestjs/config"
import z from "zod"

const billingConfigSchema = z.object({
	STRIPE_API_KEY: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string(),
	STRIPE_SENDER_PRICE_ID: z.string(),
	STRIPE_SMS_CREDIT_PRICE_ID: z.string(),
	STRIPE_SMS_CREDIT_METER_ID: z.string()
})

const billingConfig = registerAs("billing", () => ({
	stripeApiKey: process.env.STRIPE_API_KEY,
	stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
	stripeSenderPriceId: process.env.STRIPE_SENDER_PRICE_ID,
	stripeSmsCreditPriceId: process.env.STRIPE_SMS_CREDIT_PRICE_ID,
	stripeSmsCreditMeterId: process.env.STRIPE_SMS_CREDIT_METER_ID
}))

export { billingConfig, billingConfigSchema }

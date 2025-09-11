import { registerAs } from "@nestjs/config"
import z from "zod"

const bullmqConfigSchema = z.object({
	REDIS_URL: z.string()
})

const bullmqConfig = registerAs("bullmq", () => ({
	url: process.env.REDIS_URL
}))

export { bullmqConfig, bullmqConfigSchema }

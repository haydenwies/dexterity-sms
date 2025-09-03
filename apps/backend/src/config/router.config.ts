import { registerAs } from "@nestjs/config"
import z from "zod"

const routerConfigSchema = z.object({
	WEB_URL: z.url()
})

const routerConfig = registerAs("router", () => ({
	webUrl: process.env.WEB_URL
}))

export { routerConfig, routerConfigSchema }

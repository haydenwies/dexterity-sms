import { registerAs } from "@nestjs/config"
import z from "zod"

const routerConfigSchema = z.object({
	BACKEND_URL: z.url(),
	WEB_URL: z.url()
})

const routerConfig = registerAs("router", () => ({
	backendUrl: process.env.BACKEND_URL,
	webUrl: process.env.WEB_URL
}))

export { routerConfig, routerConfigSchema }

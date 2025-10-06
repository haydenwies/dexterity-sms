import { registerAs } from "@nestjs/config"
import z from "zod"

const routerConfigSchema = z.object({
	BACKEND_PUBLIC_URL: z.url(),
	WEB_PUBLIC_URL: z.url()
})

const routerConfig = registerAs("router", () => ({
	backendPublicUrl: process.env.BACKEND_PUBLIC_URL,
	webPublicUrl: process.env.WEB_PUBLIC_URL
}))

export { routerConfig, routerConfigSchema }

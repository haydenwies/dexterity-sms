import { NestFactory } from "@nestjs/core"
import { type NestExpressApplication } from "@nestjs/platform-express"
import cookieParser from "cookie-parser"

import { AppModule } from "~/app.module"

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		rawBody: true
	})

	// Enable cookie parsing (for auth)
	app.use(cookieParser())

	// Configure CORS to allow credentials
	app.enableCors({
		origin: process.env.WEB_PUBLIC_URL || "http://localhost:3000",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"]
	})

	// Binding to hostname :: requied to listen on IPv4 and IPv6
	await app.listen(process.env.PORT ?? 5005, "::")
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()

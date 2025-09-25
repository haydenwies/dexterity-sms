import { NestFactory } from "@nestjs/core"
import cookieParser from "cookie-parser"

import { AppModule } from "~/app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Enable cookie parsing
	app.use(cookieParser())

	// Configure CORS to allow credentials
	app.enableCors({
		origin: process.env.WEB_URL || "http://localhost:3000",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"]
	})

	await app.listen(process.env.PORT ?? 8080)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()

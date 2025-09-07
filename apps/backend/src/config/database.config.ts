import { registerAs } from "@nestjs/config"
import z from "zod"

const databaseConfigSchema = z.object({
	DATABASE_URL: z.string()
})

const databaseConfig = registerAs("database", () => ({
	url: process.env.DATABASE_URL
}))

export { databaseConfig, databaseConfigSchema }

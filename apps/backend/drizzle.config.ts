import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config()
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set")

const config = defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	schema: "./src/database/database.schema.ts",
	out: "./src/database/migrations"
})

export default config

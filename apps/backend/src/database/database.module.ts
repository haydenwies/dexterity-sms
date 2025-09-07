import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import * as schema from "~/database/database.schema"

const DATABASE_PROVIDER = "database-provider"
type DatabaseProvider = NodePgDatabase<typeof schema>

@Module({
	providers: [
		{
			provide: DATABASE_PROVIDER,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const connectionString = configService.getOrThrow<string>("database.url")
				const pool = new Pool({ connectionString })
				const db = drizzle(pool, { schema })

				return db
			}
		}
	],
	exports: [DATABASE_PROVIDER]
})
class DatabaseModule {}

export { DATABASE_PROVIDER, DatabaseModule, type DatabaseProvider }

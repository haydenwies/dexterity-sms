import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import z from "zod"

import { AuthModule } from "~/auth/auth.module"
import { databaseConfig, databaseConfigSchema } from "~/config/database.config"
import { routerConfig, routerConfigSchema } from "~/config/router.config"
import { OrganizationModule } from "~/organization/organization.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			validate: z.object({ ...routerConfigSchema.shape, ...databaseConfigSchema.shape }).parse,
			load: [routerConfig, databaseConfig]
		}),
		AuthModule,
		OrganizationModule
	],
	controllers: [],
	providers: []
})
class AppModule {}

export { AppModule }

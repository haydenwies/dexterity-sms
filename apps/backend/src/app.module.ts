import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import z from "zod"

import { AuthModule } from "~/auth/auth.module"
import { routerConfig, routerConfigSchema } from "~/config/router.config"
import { EmailModule } from "~/email/email.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			validate: z.object({ ...routerConfigSchema.shape }).parse,
			load: [routerConfig]
		}),
		AuthModule,
		EmailModule
	],
	controllers: [],
	providers: []
})
class AppModule {}

export { AppModule }

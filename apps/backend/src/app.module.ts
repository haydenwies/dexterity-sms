import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import z from "zod"

import { AuthModule } from "~/auth/auth.module"
import { CampaignModule } from "~/campaign/campaign.module"
import { bullmqConfig, bullmqConfigSchema } from "~/config/bullmq.config"
import { databaseConfig, databaseConfigSchema } from "~/config/database.config"
import { routerConfig, routerConfigSchema } from "~/config/router.config"
import { smsConfig, smsConfigSchema } from "~/config/sms.config"
import { ContactModule } from "~/contact/contact.module"
import { ConversationModule } from "~/conversation/conversation.module"
import { OrganizationModule } from "~/organization/organization.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			validate: z.object({
				...routerConfigSchema.shape,
				...databaseConfigSchema.shape,
				...bullmqConfigSchema.shape,
				...smsConfigSchema.shape
			}).parse,
			load: [routerConfig, databaseConfig, bullmqConfig, smsConfig]
		}),
		BullModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				connection: {
					family: 0, // To work with Railway Redis
					url: configService.getOrThrow("bullmq.url")
				},
				defaultJobOptions: {
					attempts: 3,
					removeOnComplete: 10,
					removeOnFail: 10
				}
			})
		}),
		AuthModule,
		OrganizationModule,
		ContactModule,
		ConversationModule,
		CampaignModule
	],
	controllers: [],
	providers: []
})
class AppModule {}

export { AppModule }

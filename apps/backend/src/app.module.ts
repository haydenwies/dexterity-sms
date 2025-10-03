import { BullModule } from "@nestjs/bullmq"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import z from "zod"

import { AuthModule } from "~/auth/auth.module"
import { BillingModule } from "~/billing/billing.module"
import { CampaignModule } from "~/campaign/campaign.module"
import { bullmqConfig, bullmqConfigSchema } from "~/config/bullmq.config"
import { databaseConfig, databaseConfigSchema } from "~/config/database.config"
import { routerConfig, routerConfigSchema } from "~/config/router.config"
import { smsConfig, smsConfigSchema } from "~/config/sms.config"
import { ContactModule } from "~/contact/contact.module"
import { ConversationModule } from "~/conversation/conversation.module"
import { MessageModule } from "~/message/message.module"
import { OrganizationModule } from "~/organization/organization.module"
import { billingConfig, billingConfigSchema } from "./config/billing.config"
import { emailConfig, emailConfigSchema } from "./config/email.config"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			validate: z.object({
				...routerConfigSchema.shape,
				...databaseConfigSchema.shape,
				...bullmqConfigSchema.shape,
				...smsConfigSchema.shape,
				...billingConfigSchema.shape,
				...emailConfigSchema.shape
			}).parse,
			load: [routerConfig, databaseConfig, bullmqConfig, smsConfig, billingConfig, emailConfig]
		}),
		BullModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				connection: {
					family: 0, // To work with Railway Redis
					url: configService.getOrThrow<string>("bullmq.url")
				},
				defaultJobOptions: {
					attempts: 3,
					removeOnComplete: 10,
					removeOnFail: 10
				}
			})
		}),
		EventEmitterModule.forRoot(),
		AuthModule,
		OrganizationModule,
		BillingModule,
		ContactModule,
		MessageModule,
		ConversationModule,
		CampaignModule
	],
	controllers: [],
	providers: []
})
class AppModule {}

export { AppModule }

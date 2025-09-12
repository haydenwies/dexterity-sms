import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { TwilioProvider, type SmsProvider as SmsProviderType } from "@repo/sms"

const SMS_PROVIDER = "sms-provider"
type SmsProvider = SmsProviderType

@Module({
	providers: [
		{
			provide: SMS_PROVIDER,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const provider = new TwilioProvider({
					accountSid: configService.getOrThrow("sms.twilioAccountSid"),
					authToken: configService.getOrThrow("sms.twilioAuthToken")
				})

				return provider
			}
		}
	]
})
class SmsModule {}

export { SMS_PROVIDER, SmsModule, type SmsProvider }

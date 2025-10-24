import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { type Request } from "express"

import { routes } from "@dexterity-sms/routes"

import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"

@Injectable()
class MessageStatusWebhookGuard implements CanActivate {
	private readonly logger = new Logger(MessageStatusWebhookGuard.name)

	constructor(
		private readonly configService: ConfigService,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()

		// Convert the headers to record of strings
		const headers = Object.entries(request.headers).reduce<Record<string, string>>((acc, [key, value]) => {
			if (typeof value !== "string") return acc
			acc[key] = value
			return acc
		}, {})

		const body = request.body

		// Construct the URL for the webhook
		const url = `${this.configService.getOrThrow<string>("router.backendPublicUrl")}${routes.backend.MESSAGE_STATUS_WEBHOOK}`

		// Use the SMS provider to validate the webhook
		const isValid = this.smsProvider.validateWebhook(headers, body, url)

		if (!isValid) this.logger.warn("Message status webhook validation failed")
		else this.logger.log("Message status webhook validation successful")

		return isValid
	}
}

@Injectable()
class MessageInboundWebhookGuard implements CanActivate {
	private readonly logger = new Logger(MessageInboundWebhookGuard.name)

	constructor(
		private readonly configService: ConfigService,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()

		// Convert the headers to record of strings
		const headers = Object.entries(request.headers).reduce<Record<string, string>>((acc, [key, value]) => {
			if (typeof value !== "string") return acc
			acc[key] = value
			return acc
		}, {})

		const body = request.body

		// Construct the URL for the webhook
		const url = `${this.configService.getOrThrow<string>("router.backendPublicUrl")}${routes.backend.INBOUND_MESSAGE_WEBHOOK}`

		// Use the SMS provider to validate the webhook
		const isValid = this.smsProvider.validateWebhook(headers, body, url)

		if (!isValid) this.logger.warn("Message inbound webhook validation failed")
		else this.logger.log("Message inbound webhook validation successful")

		return isValid
	}
}

export { MessageInboundWebhookGuard, MessageStatusWebhookGuard }

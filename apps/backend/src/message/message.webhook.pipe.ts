import { ArgumentMetadata, Inject, Injectable, Logger, PipeTransform } from "@nestjs/common"

import { type StatusWebhookEvent } from "@repo/sms"

import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"

@Injectable()
class MessageStatusWebhookPipe implements PipeTransform {
	private readonly logger = new Logger(MessageStatusWebhookPipe.name)

	constructor(@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider) {}

	transform(value: unknown, metadata: ArgumentMetadata): StatusWebhookEvent | null {
		const payload = this.smsProvider.parseStatusWebhookPayload(value)
		if (!payload) this.logger.warn("Failed to parse message status webhook payload", { value })

		return payload
	}
}

export { MessageStatusWebhookPipe }

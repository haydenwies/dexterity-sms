import { Body, Controller, Logger, Post, UseGuards } from "@nestjs/common"

import { type StatusWebhookEvent } from "@repo/sms"

import { MessageStatusWebhookGuard } from "~/message/message.webhook.guard"
import { MessageStatusWebhookPipe } from "~/message/message.webhook.pipe"
import { MessageWebhookService } from "~/message/message.webhook.service"

@Controller("webhooks/message")
class MessageWebhookController {
	private readonly logger = new Logger(MessageWebhookController.name)

	constructor(private readonly messageWebhookService: MessageWebhookService) {}

	@UseGuards(MessageStatusWebhookGuard)
	@Post("status")
	async handleStatusWebhook(@Body(MessageStatusWebhookPipe) body: StatusWebhookEvent | null): Promise<void> {
		if (!body) {
			this.logger.warn("Invalid message status webhook payload")
			return
		}

		try {
			this.logger.log("Received message status webhook")
			await this.messageWebhookService.handleStatusUpdate(body)
		} catch (error: unknown) {
			this.logger.error("Error processing message status webhook", { error })
		}
	}
}

export { MessageWebhookController }

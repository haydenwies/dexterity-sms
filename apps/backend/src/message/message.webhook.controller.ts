import { Body, Controller, Logger, Post, UseGuards } from "@nestjs/common"

import { type InboundWebhookEvent, type StatusWebhookEvent } from "@repo/sms"

import { MessageInboundWebhookGuard, MessageStatusWebhookGuard } from "~/message/message.webhook.guard"
import { MessageInboundWebhookPipe, MessageStatusWebhookPipe } from "~/message/message.webhook.pipe"
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

	@UseGuards(MessageInboundWebhookGuard)
	@Post("inbound")
	async handleInboundWebhook(@Body(MessageInboundWebhookPipe) body: InboundWebhookEvent | null): Promise<void> {
		if (!body) {
			this.logger.warn("Invalid message inbound webhook payload")
			return
		}

		try {
			this.logger.log("Received message inbound webhook")
			await this.messageWebhookService.handleInboundMessage(body)
		} catch (error: unknown) {
			this.logger.error("Error processing message inbound webhook", { error })
		}
	}
}

export { MessageWebhookController }

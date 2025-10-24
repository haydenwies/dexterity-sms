import { Body, Controller, Logger, Post, UseGuards } from "@nestjs/common"

import { type InboundWebhookEvent, type StatusWebhookEvent } from "@dexterity-sms/sms"

import { MessageInboundWebhookGuard, MessageStatusWebhookGuard } from "~/message/guards/message.webhook.guard"
import { MessageWebhookService } from "~/message/message.service"
import { MessageInboundWebhookPipe, MessageStatusWebhookPipe } from "~/message/pipes/message.webhook.pipe"

@Controller("webhooks/messages")
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

		await this.messageWebhookService.handleStatusUpdate(body)
	}

	@UseGuards(MessageInboundWebhookGuard)
	@Post("inbound")
	async handleInboundWebhook(@Body(MessageInboundWebhookPipe) body: InboundWebhookEvent | null): Promise<void> {
		if (!body) {
			this.logger.warn("Invalid message inbound webhook payload")
			return
		}

		await this.messageWebhookService.handleInboundMessage(body)
	}
}

export { MessageWebhookController }

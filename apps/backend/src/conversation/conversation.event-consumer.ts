import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Job } from "bullmq"

import { MessageDirection } from "@repo/types/message"

import { Phone } from "~/common/phone.vo"
import { ConversationRepository } from "~/conversation/conversation.repository"
import { EVENT_QUEUE, EVENT_TOPIC, MessageCreatedEvent } from "~/event/event.types"
import { MessageService } from "~/message/message.service"
import { Conversation } from "./conversation.entity"

@Processor(EVENT_QUEUE)
class ConversationEventConsumer extends WorkerHost {
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly messageService: MessageService
	) {
		super()
	}

	async process(job: Job) {
		switch (job.name) {
			case EVENT_TOPIC.MESSAGE_CREATED: {
				return this.processMessageCreated(job)
			}
		}
	}

	private async processMessageCreated(job: Job<MessageCreatedEvent>) {
		const payload = job.data

		// Skip if message is already linked to a conversation
		if (payload.conversationId) return

		// Determine the conversation recipient from the message direction
		let recipient: Phone
		if (payload.direction === MessageDirection.OUTBOUND) recipient = Phone.create(payload.to)
		else recipient = Phone.create(payload.from)

		// Find or create the conversation
		let conversation = await this.conversationRepository.findByRecipient(payload.organizationId, recipient)
		if (!conversation) {
			conversation = Conversation.create({ organizationId: payload.organizationId, recipient })
			conversation = await this.conversationRepository.create(conversation)
		}

		// Link the message to the conversation
		await this.messageService.updateConversationId(payload.organizationId, payload.messageId, conversation.id)
	}
}

export { ConversationEventConsumer }

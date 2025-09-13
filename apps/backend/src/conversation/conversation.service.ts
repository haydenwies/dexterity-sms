import { Injectable, NotFoundException } from "@nestjs/common"
import { ConversationModel } from "@repo/types/message"

import { Conversation } from "~/conversation/conversation.entity"
import { ConversationRepository } from "~/conversation/conversation.repository"

@Injectable()
export class ConversationService {
	constructor(private readonly conversationRepository: ConversationRepository) {}

	async get(organizationId: string, conversationId: string): Promise<Conversation> {
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		return conversation
	}

	toDto(conversation: Conversation): ConversationModel {
		// @ts-expect-error - TODO: Add unreadCount, createdAt, updatedAt
		return {
			id: conversation.id,
			organizationId: conversation.organizationId,
			recipient: conversation.recipient.value
		}
	}
}

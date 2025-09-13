import { Injectable, NotFoundException } from "@nestjs/common"
import { ConversationModel, CreateConversationDto } from "@repo/types/message"

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

	async getMany(organizationId: string): Promise<Conversation[]> {
		return this.conversationRepository.findMany(organizationId)
	}

	async create(organizationId: string, dto: CreateConversationDto): Promise<Conversation> {
		const conversation = Conversation.create({
			organizationId,
			// @ts-expect-error - TODO: Add recipient to dto
			recipient: dto.contactId
		})
		const createdConversation = await this.conversationRepository.create(conversation)

		return createdConversation
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

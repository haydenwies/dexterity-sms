import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"

import { type CreateConversationDto, type SendMessageDto } from "@repo/types/conversation"

import { Conversation } from "~/conversation/conversation.entity"
import { ConversationRepository } from "~/conversation/conversation.repository"
import { Message } from "~/message/message.entity"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

@Injectable()
export class ConversationService {
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly senderService: SenderService,
		private readonly messageService: MessageService,
		private readonly unsubscribeService: UnsubscribeService
	) {}

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

	async getManyMessages(organizationId: string, conversationId: string): Promise<Message[]> {
		const messages = await this.messageService.getMany(organizationId, {
			conversationId
		})

		return messages
	}

	async sendMessage(organizationId: string, conversationId: string, dto: SendMessageDto): Promise<void> {
		// Find conversation
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		// Check if the recipient is unsubscribed
		const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, conversation.recipient)
		if (isUnsubscribed)
			throw new BadRequestException(
				`Cannot send message to unsubscribed recipient: ${conversation.recipient.value}`
			)

		// Find sender
		const sender = await this.senderService.get(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		// Send message
		await this.messageService.send(organizationId, {
			conversationId,
			body: dto.body,
			from: sender.phone,
			to: conversation.recipient
		})
	}

	async isUnsubscribed(organizationId: string, conversationId: string): Promise<{ isUnsubscribed: boolean }> {
		// Find conversation
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		// Check if the recipient is unsubscribed
		const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, conversation.recipient)
		return { isUnsubscribed }
	}
}

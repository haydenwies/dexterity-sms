import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import { type CreateConversationDto, type SendMessageDto } from "@repo/types/conversation"
import { filter, fromEvent, map, merge, mergeMap, Observable } from "rxjs"

import { Conversation } from "~/conversation/conversation.entity"
import { ConversationRepository } from "~/conversation/conversation.repository"
import {
	ConversationCreatedEvent,
	ConversationUpdatedEvent,
	EVENT_TOPIC,
	MessageUpdatedEvent,
	type MessageCreatedEvent
} from "~/event/event.types"
import { Message } from "~/message/message.entity"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"
import { toConversationCreatedEvent } from "./conversation.utils"

@Injectable()
export class ConversationService {
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly senderService: SenderService,
		private readonly messageService: MessageService,
		private readonly unsubscribeService: UnsubscribeService,
		private readonly eventEmitter: EventEmitter2
	) {}

	async safeGet(organizationId: string, conversationId: string): Promise<Conversation | undefined> {
		const conversation = await this.conversationRepository.find(organizationId, conversationId)

		return conversation
	}

	async get(organizationId: string, conversationId: string): Promise<Conversation> {
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		return conversation
	}

	async getMany(organizationId: string): Promise<Conversation[]> {
		return this.conversationRepository.findMany(organizationId)
	}

	streamManyConversations(organizationId: string): Observable<Conversation> {
		const created$ = fromEvent(this.eventEmitter, EVENT_TOPIC.CONVERSATION_CREATED).pipe(
			map((conversation) => conversation as ConversationCreatedEvent),
			filter((conversation) => conversation.organizationId === organizationId),
			mergeMap(async (conversation) => {
				const c = await this.conversationRepository.find(organizationId, conversation.id)
				if (!c) throw new NotFoundException("Conversation not found")

				return c
			})
		)

		const updated$ = fromEvent(this.eventEmitter, EVENT_TOPIC.CONVERSATION_UPDATED).pipe(
			map((conversation) => conversation as ConversationUpdatedEvent),
			filter((conversation) => conversation.organizationId === organizationId),
			mergeMap(async (conversation) => {
				const c = await this.conversationRepository.find(organizationId, conversation.id)
				if (!c) throw new NotFoundException("Conversation not found")

				return c
			})
		)

		return merge(created$, updated$)
	}

	async create(organizationId: string, dto: CreateConversationDto): Promise<Conversation> {
		const conversation = Conversation.create({
			organizationId,
			// @ts-expect-error - TODO: Add recipient to dto
			recipient: dto.contactId
		})
		const createdConversation = await this.conversationRepository.create(conversation)

		await this.eventEmitter.emitAsync(
			EVENT_TOPIC.CONVERSATION_CREATED,
			toConversationCreatedEvent(createdConversation)
		)

		return createdConversation
	}

	async getManyConversationMessages(organizationId: string, conversationId: string): Promise<Message[]> {
		const messages = await this.messageService.getMany(organizationId, {
			conversationId
		})

		return messages
	}

	streamManyConversationMessages(organizationId: string, conversationId: string): Observable<Message> {
		const created$ = fromEvent(this.eventEmitter, EVENT_TOPIC.MESSAGE_CREATED).pipe(
			map((msg) => msg as MessageCreatedEvent),
			filter((msg) => msg.conversationId === conversationId),
			mergeMap((msg) => this.messageService.get(organizationId, msg.messageId))
		)

		const updated$ = fromEvent(this.eventEmitter, EVENT_TOPIC.MESSAGE_UPDATED).pipe(
			map((msg) => msg as MessageUpdatedEvent),
			filter((msg) => msg.conversationId === conversationId),
			mergeMap((msg) => this.messageService.get(organizationId, msg.id))
		)

		// return created$
		return merge(created$, updated$)
	}

	async sendConversationMessage(organizationId: string, conversationId: string, dto: SendMessageDto): Promise<void> {
		// Find conversation
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		// Check if the recipient is unsubscribed
		const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, conversation.recipient)
		if (isUnsubscribed) throw new BadRequestException(`Cannot send message to unsubscribed recipient`)

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

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { filter, fromEvent, map, merge, mergeMap, Observable } from "rxjs"

import { type SendMessageDto } from "@repo/types/conversation"

import {
	Event,
	type ConversationCreatedEvent,
	type ConversationUpdatedEvent,
	type MessageCreatedEvent,
	type MessageUpdatedEvent
} from "~/common/event.types"
import { toConversationUpdatedEvent } from "~/conversation/conversation.utils"
import { Conversation } from "~/conversation/entities/conversation.entity"
import { ConversationRepository } from "~/conversation/repositories/conversation.repository"
import { Message } from "~/message/entities/message.entity"
import { MessageService } from "~/message/message.service"
import { SenderService } from "~/sender/sender.service"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

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
		const conversations = await this.conversationRepository.findMany(organizationId)

		return conversations
	}

	async getUnreadCount(organizationId: string): Promise<number> {
		const count = await this.conversationRepository.getUnreadCount(organizationId)

		return count
	}

	streamUnreadCount(organizationId: string): Observable<number> {
		const created$ = fromEvent(this.eventEmitter, Event.CONVERSATION_CREATED).pipe(
			map((conversation) => conversation as ConversationCreatedEvent),
			filter((conversation) => conversation.organizationId === organizationId),
			mergeMap(async () => await this.conversationRepository.getUnreadCount(organizationId))
		)

		const updated$ = fromEvent(this.eventEmitter, Event.CONVERSATION_UPDATED).pipe(
			map((conversation) => conversation as ConversationUpdatedEvent),
			filter((conversation) => conversation.organizationId === organizationId),
			mergeMap(async () => await this.conversationRepository.getUnreadCount(organizationId))
		)

		return merge(created$, updated$)
	}

	streamManyConversations(organizationId: string): Observable<Conversation> {
		const created$ = fromEvent(this.eventEmitter, Event.CONVERSATION_CREATED).pipe(
			map((conversation) => conversation as ConversationCreatedEvent),
			filter((conversation) => conversation.organizationId === organizationId),
			mergeMap(async (conversation) => {
				const c = await this.conversationRepository.find(organizationId, conversation.id)
				if (!c) throw new NotFoundException("Conversation not found")

				return c
			})
		)

		const updated$ = fromEvent(this.eventEmitter, Event.CONVERSATION_UPDATED).pipe(
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

	async getManyConversationMessages(organizationId: string, conversationId: string): Promise<Message[]> {
		const messages = await this.messageService.getMany(organizationId, {
			conversationId
		})

		return messages
	}

	streamManyConversationMessages(organizationId: string, conversationId: string): Observable<Message> {
		const created$ = fromEvent(this.eventEmitter, Event.MESSAGE_CREATED).pipe(
			map((msg) => msg as MessageCreatedEvent),
			filter((msg) => msg.conversationId === conversationId),
			mergeMap((msg) => this.messageService.get(organizationId, msg.messageId))
		)

		const updated$ = fromEvent(this.eventEmitter, Event.MESSAGE_UPDATED).pipe(
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
		if (isUnsubscribed) throw new BadRequestException(`Cannot send message, this recipient is unsubscribed`)

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

	async readConversation(organizationId: string, conversationId: string): Promise<void> {
		// Find conversation
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		// Clear unread count
		conversation.clearUnreadCount()
		await this.conversationRepository.update(conversation)

		// Emit event
		await this.eventEmitter.emitAsync(Event.CONVERSATION_UPDATED, toConversationUpdatedEvent(conversation))
	}

	async isConversationUnsubscribed(
		organizationId: string,
		conversationId: string
	): Promise<{ isUnsubscribed: boolean }> {
		// Find conversation
		const conversation = await this.conversationRepository.find(organizationId, conversationId)
		if (!conversation) throw new NotFoundException("Conversation not found")

		// Check if the recipient is unsubscribed
		const isUnsubscribed = await this.unsubscribeService.isUnsubscribed(organizationId, conversation.recipient)
		return { isUnsubscribed }
	}
}

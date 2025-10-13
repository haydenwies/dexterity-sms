import { Body, Controller, Get, MessageEvent, Param, Post, Sse, UseGuards } from "@nestjs/common"
import { map, type Observable } from "rxjs"

import { type ConversationModel, type SendMessageDto, sendMessageDtoSchema } from "@repo/types/conversation"
import { type MessageModel } from "@repo/types/message"

import { AuthGuard } from "~/auth/auth.guard"
import { SubscriptionGuard } from "~/billing/guards/subscription.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { ConversationService } from "~/conversation/conversation.service"
import { toConversationDto } from "~/conversation/conversation.utils"
import { ConversationGuard } from "~/conversation/guards/conversation.guard"
import { toMessageDto } from "~/message/message.utils"
import { MemberGuard } from "~/organization/guards/member.guard"
import { SenderGuard } from "~/sender/guards/sender.guard"

@UseGuards(AuthGuard, MemberGuard)
@Controller("organizations/:organizationId/conversations")
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	@Get()
	async getMany(@Param("organizationId") organizationId: string): Promise<ConversationModel[]> {
		const conversations = await this.conversationService.getMany(organizationId)

		return conversations.map((conversation) => toConversationDto(conversation))
	}

	@Get("unread-count")
	async getUnreadCount(@Param("organizationId") organizationId: string): Promise<{ count: number }> {
		const count = await this.conversationService.getUnreadCount(organizationId)

		return { count }
	}

	@Sse("unread-count/stream")
	streamUnreadCount(
		@Param("organizationId") organizationId: string
	): Observable<MessageEvent & { data: { count: number } }> {
		return this.conversationService.streamUnreadCount(organizationId).pipe(map((count) => ({ data: { count } })))
	}

	@Sse("stream")
	streamMany(
		@Param("organizationId") organizationId: string
	): Observable<MessageEvent & { data: ConversationModel }> {
		return this.conversationService
			.streamManyConversations(organizationId)
			.pipe(map((conversation) => ({ data: toConversationDto(conversation) })))
	}

	@UseGuards(ConversationGuard)
	@Get(":conversationId")
	async get(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<ConversationModel> {
		const conversation = await this.conversationService.get(organizationId, conversationId)

		return toConversationDto(conversation)
	}

	@UseGuards(ConversationGuard)
	@Get(":conversationId/messages")
	async getManyConversationMessages(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<MessageModel[]> {
		const messages = await this.conversationService.getManyConversationMessages(organizationId, conversationId)

		return messages.map((message) => toMessageDto(message))
	}

	@UseGuards(ConversationGuard, SubscriptionGuard, SenderGuard)
	@Post(":conversationId/messages")
	async sendConversationMessage(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string,
		@Body(new ZodValidationPipe(sendMessageDtoSchema)) body: SendMessageDto
	): Promise<void> {
		await this.conversationService.sendConversationMessage(organizationId, conversationId, body)
	}

	@UseGuards(ConversationGuard)
	@Sse(":conversationId/messages/stream")
	streamManyConversationMessages(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Observable<MessageEvent & { data: MessageModel }> {
		return this.conversationService
			.streamManyConversationMessages(organizationId, conversationId)
			.pipe(map((message) => ({ data: toMessageDto(message) })))
	}

	@UseGuards(ConversationGuard)
	@Post(":conversationId/read")
	async readConversationMessage(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<void> {
		await this.conversationService.readConversation(organizationId, conversationId)
	}
}

import { Body, Controller, Get, MessageEvent, Param, Post, Res, Sse, UseGuards } from "@nestjs/common"
import { type Response } from "express"
import { map, type Observable } from "rxjs"

import {
	type ConversationModel,
	type CreateConversationDto,
	createConversationDtoSchema,
	type SendMessageDto,
	sendMessageDtoSchema
} from "@repo/types/conversation"
import { type MessageModel } from "@repo/types/message"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { ConversationService } from "~/conversation/conversation.service"
import { toConversationDto } from "~/conversation/conversation.utils"
import { toMessageDto } from "~/message/message.utils"
import { OrganizationGuard } from "~/organization/organization.guard"
import { ConversationGuard } from "./conversation.guard"

@UseGuards(AuthGuard, OrganizationGuard)
@Controller("organizations/:organizationId/conversations")
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	@Get()
	async getMany(@Param("organizationId") organizationId: string): Promise<ConversationModel[]> {
		const conversations = await this.conversationService.getMany(organizationId)

		return conversations.map((conversation) => toConversationDto(conversation))
	}

	@Post()
	async create(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createConversationDtoSchema)) body: CreateConversationDto
	): Promise<ConversationModel> {
		const conversation = await this.conversationService.create(organizationId, body)

		return toConversationDto(conversation)
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

	@Sse(":conversationId/stream")
	streamConversation(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string,
		@Res() res: Response
	): Observable<MessageEvent & { data: ConversationModel }> {
		// Set CORS headers
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000") // TODO: Fix CORS
		res.setHeader("Access-Control-Allow-Credentials", "true")
		res.setHeader("Cache-Control", "no-cache")
		res.setHeader("Connection", "keep-alive")
		res.setHeader("Content-Type", "text/event-stream")

		return this.conversationService
			.streamConversation(organizationId, conversationId)
			.pipe(map((conversation) => ({ data: toConversationDto(conversation) })))
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

	@UseGuards(ConversationGuard)
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
	streamConversationMessages(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string,
		@Res() res: Response
	): Observable<MessageEvent & { data: MessageModel }> {
		// Set CORS headers
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000") // TODO: Fix CORS
		res.setHeader("Access-Control-Allow-Credentials", "true")
		res.setHeader("Cache-Control", "no-cache")
		res.setHeader("Connection", "keep-alive")
		res.setHeader("Content-Type", "text/event-stream")

		return this.conversationService
			.streamConversationMessage(organizationId, conversationId)
			.pipe(map((message) => ({ data: toMessageDto(message) })))
	}

	@UseGuards(ConversationGuard)
	@Get(":conversationId/unsubscribed")
	async isUnsubscribed(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<{ isUnsubscribed: boolean }> {
		return await this.conversationService.isUnsubscribed(organizationId, conversationId)
	}
}

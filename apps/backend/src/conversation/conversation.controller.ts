import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"

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

	@Get(":conversationId")
	async get(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<ConversationModel> {
		const conversation = await this.conversationService.get(organizationId, conversationId)

		return toConversationDto(conversation)
	}

	@Get(":conversationId/messages")
	async getManyMessages(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<MessageModel[]> {
		const messages = await this.conversationService.getManyMessages(organizationId, conversationId)

		return messages.map((message) => toMessageDto(message))
	}

	@Post(":conversationId/messages")
	async sendMessage(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string,
		@Body(new ZodValidationPipe(sendMessageDtoSchema)) body: SendMessageDto
	): Promise<void> {
		await this.conversationService.sendMessage(organizationId, conversationId, body)
	}
}

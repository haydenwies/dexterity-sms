import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { type ConversationModel, type CreateConversationDto, createConversationDtoSchema } from "@repo/types/message"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { ConversationService } from "~/conversation/conversation.service"
import { OrganizationGuard } from "~/organization/organization.guard"

@UseGuards(AuthGuard, OrganizationGuard)
@Controller("organizations/:organizationId/conversations")
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	@Get()
	async getMany(@Param("organizationId") organizationId: string): Promise<ConversationModel[]> {
		const conversations = await this.conversationService.getMany(organizationId)

		return conversations.map((conversation) => this.conversationService.toDto(conversation))
	}

	@Post()
	async create(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(createConversationDtoSchema)) body: CreateConversationDto
	): Promise<ConversationModel> {
		const conversation = await this.conversationService.create(organizationId, body)

		return this.conversationService.toDto(conversation)
	}

	@Get(":conversationId")
	async getById(
		@Param("organizationId") organizationId: string,
		@Param("conversationId") conversationId: string
	): Promise<ConversationModel> {
		const conversation = await this.conversationService.get(organizationId, conversationId)

		return this.conversationService.toDto(conversation)
	}
}

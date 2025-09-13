import { Controller, Get, Param, UseGuards } from "@nestjs/common"

import { AuthGuard } from "~/auth/auth.guard"
import { ConversationService } from "~/conversation/conversation.service"
import { OrganizationGuard } from "~/organization/organization.guard"

@UseGuards(AuthGuard, OrganizationGuard)
@Controller("organizations/:organizationId/conversations")
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	@Get(":conversationId")
	async getById(@Param("organizationId") organizationId: string, @Param("conversationId") conversationId: string) {
		const conversation = await this.conversationService.get(organizationId, conversationId)

		return this.conversationService.toDto(conversation)
	}
}

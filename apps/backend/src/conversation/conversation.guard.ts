import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

import { AuthRequest } from "~/auth/auth.guard"
import { ConversationService } from "~/conversation/conversation.service"

@Injectable()
class ConversationGuard implements CanActivate {
	constructor(private readonly conversationService: ConversationService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		// Get organizationId from route parameters
		const organizationId = request.params?.organizationId
		if (!organizationId) return false

		// Get conversationId from route parameters
		const conversationId = request.params?.conversationId
		if (!conversationId) return false

		// Check if converasation exists
		const conversation = await this.conversationService.safeGet(organizationId, conversationId)
		if (!conversation) return false

		return true
	}
}

export { ConversationGuard }

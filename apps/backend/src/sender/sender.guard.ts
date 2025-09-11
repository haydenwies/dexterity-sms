import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

import { AuthRequest } from "~/auth/auth.guard"
import { SenderService } from "~/sender/sender.service"

@Injectable()
class SenderGuard implements CanActivate {
	constructor(private readonly senderService: SenderService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		const organizationId = request.params?.organizationId
		if (!organizationId) return false

		const sender = await this.senderService.safeGet(organizationId)
		if (!sender) return false

		return true
	}
}

export { SenderGuard }

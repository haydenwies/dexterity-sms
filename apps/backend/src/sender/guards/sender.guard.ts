import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common"

import { AuthRequest } from "~/auth/auth.guard"
import { SenderService } from "~/sender/sender.service"

@Injectable()
class SenderGuard implements CanActivate {
	private readonly logger = new Logger(SenderGuard.name)

	constructor(private readonly senderService: SenderService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		const organizationId = request.params?.organizationId
		if (!organizationId) {
			this.logger.warn("No organizationId found in request params")
			return false
		}

		const sender = await this.senderService.safeGet(organizationId)
		if (!sender) return false

		return true
	}
}

export { SenderGuard }

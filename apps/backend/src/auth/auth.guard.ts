import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { type Request } from "express"

import { SessionService } from "~/auth/session/session.service"
import { UserService } from "~/auth/user/user.service"

@Injectable()
class AuthGuard implements CanActivate {
	constructor(
		private readonly sessionService: SessionService,
		private readonly userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()

		const [type, token] = request.headers.authorization?.split(" ") ?? []
		if (type !== "Bearer" || !token) return false

		const session = await this.sessionService.find(token)
		if (!session) return false
		// request.session = sessionService.toDto(session)

		const user = await this.userService.find(session.userId)
		if (!user) {
			await this.sessionService.deleteAllByUserId(session.userId)
			return false
		}
		// request.user = userService.toDto(user)

		return true
	}
}

export { AuthGuard }

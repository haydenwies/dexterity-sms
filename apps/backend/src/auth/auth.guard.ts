import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { type Request } from "express"

import { Session } from "~/auth/session/session.entity"
import { SessionService } from "~/auth/session/session.service"
import { User } from "~/auth/user/user.entity"
import { UserService } from "~/auth/user/user.service"

type AuthRequest = Request & { user: User; session: Session }

@Injectable()
class AuthGuard implements CanActivate {
	constructor(
		private readonly sessionService: SessionService,
		private readonly userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		const [type, token] = request.headers.authorization?.split(" ") ?? []
		if (type !== "Bearer" || !token) return false

		const session = await this.sessionService.find(token)
		if (!session) return false
		request.session = session

		const user = await this.userService.find(session.userId)
		if (!user) {
			await this.sessionService.delete(session, { allMatchingUserId: true })
			return false
		}
		request.user = user

		return true
	}
}

export { AuthGuard, type AuthRequest }

import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { AuthRequest } from "~/auth/auth.guard"
import { Session as SessionEntity } from "~/auth/session/session.entity"
import { User as UserEntity } from "~/auth/user/user.entity"

const Session = createParamDecorator((_data: unknown, ctx: ExecutionContext): SessionEntity => {
	const request = ctx.switchToHttp().getRequest<AuthRequest>()

	return request.session
})

const User = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserEntity => {
	const request = ctx.switchToHttp().getRequest<AuthRequest>()

	return request.user
})

export { Session, User }

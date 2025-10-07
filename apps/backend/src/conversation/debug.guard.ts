import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

import { AuthRequest } from "~/auth/auth.guard"

@Injectable()
class DebugGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		console.log(request.cookies)

		return true
	}
}

export { DebugGuard }

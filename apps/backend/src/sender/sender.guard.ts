import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
class SenderGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		return true
	}
}

export { SenderGuard }

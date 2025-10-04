import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

import { AuthRequest } from "~/auth/auth.guard"
import { OrganizationService } from "~/organization/organization.service"

/**
 * Ensures the user accessing the resource is a member of the specified organization.
 * Must be used in conjunction with AuthGuard.
 *
 * :organizationId route param must be present, otherwise will return false.
 */
@Injectable()
class MemberGuard implements CanActivate {
	constructor(private readonly organizationService: OrganizationService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		// Get user from request (should be set by AuthGuard)
		const user = request.user
		if (!user) return false

		// Get organizationId from route parameters
		const organizationId = request.params?.organizationId
		if (!organizationId) return false

		// Check if user belongs to the organization
		const member = await this.organizationService.safeGetMember(user.id, organizationId)
		if (!member) return false

		return true
	}
}

export { MemberGuard }

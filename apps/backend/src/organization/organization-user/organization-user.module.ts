import { Module } from "@nestjs/common"

import { OrganizationUserRepository } from "~/organization/organization-user/organization-user.repository"
import { OrganizationUserService } from "~/organization/organization-user/organization-user.service"

@Module({
	providers: [OrganizationUserService, OrganizationUserRepository],
	exports: [OrganizationUserService]
})
class OrganizationUserModule {}

export { OrganizationUserModule }

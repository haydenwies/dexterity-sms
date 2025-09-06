import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { OrganizationUserModule } from "~/organization/organization-user/organization-user.module"
import { OrganizationController } from "~/organization/organization.controller"
import { OrganizationRepository } from "~/organization/organization.repository"
import { OrganizationService } from "~/organization/organization.service"

@Module({
	imports: [AuthModule, OrganizationUserModule],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository]
})
class OrganizationModule {}

export { OrganizationModule }

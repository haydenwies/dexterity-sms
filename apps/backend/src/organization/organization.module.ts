import { Module } from "@nestjs/common"

import { OrganizationController } from "~/organization/organization.controller"
import { OrganizationRepository } from "~/organization/organization.repository"
import { OrganizationService } from "~/organization/organization.service"
import { OrganizationUserModule } from "./organization-user/organization-user.module"

@Module({
	imports: [OrganizationUserModule],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository]
})
class OrganizationModule {}

export { OrganizationModule }

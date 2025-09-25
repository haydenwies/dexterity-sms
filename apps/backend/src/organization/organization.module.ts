import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { DatabaseModule } from "~/database/database.module"
import { MemberModule } from "~/organization/member/member.module"
import { OrganizationController } from "~/organization/organization.controller"
import { OrganizationRepository } from "~/organization/organization.repository"
import { OrganizationService } from "~/organization/organization.service"

@Module({
	imports: [AuthModule, DatabaseModule, MemberModule],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository],
	exports: [
		OrganizationService,
		MemberModule // Needed for OrganizationGuard
	]
})
class OrganizationModule {}

export { OrganizationModule }

import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { DatabaseModule } from "~/database/database.module"
import { OrganizationController } from "~/organization/organization.controller"
import { OrganizationService } from "~/organization/organization.service"
import { OrganizationRepository } from "~/organization/repositories/organization.repository"
import { MemberRepository } from "./repositories/member.repository"

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository, MemberRepository],
	exports: [
		OrganizationService,
		MemberRepository // Needed for MemberGuard
	]
})
class OrganizationModule {}

export { OrganizationModule }

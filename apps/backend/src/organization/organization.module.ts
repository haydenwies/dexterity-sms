import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { DatabaseModule } from "~/database/database.module"
import { MemberModule } from "~/organization/member/member.module"
import { OrganizationController } from "~/organization/organization.controller"
import { OrganizationRepository } from "~/organization/organization.repository"
import { OrganizationService } from "~/organization/organization.service"
import { MemberService } from "./member/member.service"

@Module({
	imports: [AuthModule, DatabaseModule, MemberModule],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository],
	exports: [MemberService] // Exports needed for OrganizationGuard
})
class OrganizationModule {}

export { OrganizationModule }

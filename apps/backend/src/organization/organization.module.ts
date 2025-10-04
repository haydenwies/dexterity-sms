import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { DatabaseModule } from "~/database/database.module"
import { OrganizationController } from "~/organization/organization.controller"
import { OrganizationService } from "~/organization/organization.service"
import { MemberRepository } from "~/organization/repositories/member.repository"
import { OrganizationRepository } from "~/organization/repositories/organization.repository"

@Module({
	imports: [DatabaseModule, AuthModule],
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository, MemberRepository],
	exports: [OrganizationService]
})
class OrganizationModule {}

export { OrganizationModule }

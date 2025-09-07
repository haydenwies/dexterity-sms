import { Module } from "@nestjs/common"

import { DatabaseModule } from "~/database/database.module"
import { MemberRepository } from "~/organization/member/member.repository"
import { MemberService } from "~/organization/member/member.service"

@Module({
	imports: [DatabaseModule],
	providers: [MemberService, MemberRepository],
	exports: [MemberService]
})
class MemberModule {}

export { MemberModule }

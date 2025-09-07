import { Module } from "@nestjs/common"

import { SessionRepository } from "~/auth/session/session.repository"
import { SessionService } from "~/auth/session/session.service"
import { DatabaseModule } from "~/database/database.module"

@Module({
	imports: [DatabaseModule],
	providers: [SessionService, SessionRepository],
	exports: [SessionService]
})
class SessionModule {}

export { SessionModule }

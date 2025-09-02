import { Module } from "@nestjs/common"

import { AuthController } from "~/auth/auth.controller"
import { AuthService } from "~/auth/auth.service"
import { SessionRepository } from "~/auth/session/session.repository"
import { SessionService } from "~/auth/session/session.service"
import { UserRepository } from "~/auth/user/user.repository"
import { UserService } from "~/auth/user/user.service"
import { VerificationTokenRepository } from "~/auth/verification-token/verification-token.repository"
import { VerificationTokenService } from "~/auth/verification-token/verification-token.service"
import { EmailModule } from "~/email/email.module"

@Module({
	imports: [EmailModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		SessionRepository,
		SessionService,
		UserRepository,
		UserService,
		VerificationTokenRepository,
		VerificationTokenService
	]
})
class AuthModule {}

export { AuthModule }

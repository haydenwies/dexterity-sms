import { Module } from "@nestjs/common"

import { AuthController } from "~/auth/auth.controller"
import { AuthService } from "~/auth/auth.service"
import { SessionModule } from "~/auth/session/session.module"
import { UserModule } from "~/auth/user/user.module"
import { VerificationTokenModule } from "~/auth/verification-token/verification-token.module"
import { EmailModule } from "~/email/email.module"

@Module({
	imports: [EmailModule, SessionModule, UserModule, VerificationTokenModule],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [SessionModule, UserModule] // Exports needed for AuthGuard
})
class AuthModule {}

export { AuthModule }

import { Module } from "@nestjs/common"

import { AuthController } from "~/auth/auth.controller"
import { AuthService } from "~/auth/auth.service"
import { SessionModule } from "~/auth/session/session.module"
import { UserModule } from "~/auth/user/user.module"
import { VerificationTokenModule } from "~/auth/verification-token/verification-token.module"
import { EmailModule } from "~/email/email.module"

@Module({
	imports: [SessionModule, UserModule, VerificationTokenModule, EmailModule],
	controllers: [AuthController],
	providers: [AuthService]
})
class AuthModule {}

export { AuthModule }

import { Module } from "@nestjs/common"

import { AuthController } from "~/auth/auth.controller"
import { AuthService } from "~/auth/auth.service"
import { SessionRepository } from "~/auth/session/session.repository"
import { SessionService } from "~/auth/session/session.service"
import { UserRepository } from "~/auth/user/user.repository"
import { UserService } from "~/auth/user/user.service"

@Module({
	controllers: [AuthController],
	providers: [AuthService, SessionRepository, SessionService, UserRepository, UserService]
})
class AuthModule {}

export { AuthModule }

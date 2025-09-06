import { Module } from "@nestjs/common"

import { UserRepository } from "~/auth/user/user.repository"
import { UserService } from "~/auth/user/user.service"

@Module({
	providers: [UserService, UserRepository],
	exports: [UserService]
})
class UserModule {}

export { UserModule }

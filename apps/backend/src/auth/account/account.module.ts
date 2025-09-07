import { Module } from "@nestjs/common"

import { AccountRepository } from "~/auth/account/account.repository"
import { AccountService } from "~/auth/account/account.service"

@Module({
	providers: [AccountService, AccountRepository],
	exports: [AccountService]
})
class AccountModule {}

export { AccountModule }

import { Module } from "@nestjs/common"

import { AccountRepository } from "~/auth/account/account.repository"
import { AccountService } from "~/auth/account/account.service"
import { DatabaseModule } from "~/database/database.module"

@Module({
	imports: [DatabaseModule],
	providers: [AccountService, AccountRepository],
	exports: [AccountService]
})
class AccountModule {}

export { AccountModule }

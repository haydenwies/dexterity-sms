import { Injectable } from "@nestjs/common"

import { AccountProvider } from "@repo/types/auth/enum"

import { Account } from "~/auth/account/account.entity"

@Injectable()
class AccountRepository {
	async findByUserIdAndProvider(userId: string, provider: AccountProvider): Promise<Account | undefined> {
		return undefined
	}

	async create(account: Account): Promise<Account> {
		return account
	}

	async update(account: Account): Promise<Account> {
		return account
	}
}

export { AccountRepository }

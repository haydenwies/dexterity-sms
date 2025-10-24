import { Injectable, NotFoundException } from "@nestjs/common"

import { AccountProvider } from "@dexterity-sms/core/auth"

import { Account, type AccountCreateParams } from "~/auth/account/account.entity"
import { AccountRepository } from "~/auth/account/account.repository"

@Injectable()
class AccountService {
	constructor(private readonly accountRepository: AccountRepository) {}

	async findByUserIdAndProvider(userId: string, provider: AccountProvider): Promise<Account | undefined> {
		return this.accountRepository.findByUserIdAndProvider(userId, provider)
	}

	async create(params: AccountCreateParams): Promise<Account> {
		const account = await Account.create(params)
		const createdAccount = await this.accountRepository.create(account)

		return createdAccount
	}

	async updatePassword(userId: string, password: string): Promise<void> {
		const account = await this.accountRepository.findByUserIdAndProvider(userId, AccountProvider.CREDENTIALS)
		if (!account) throw new NotFoundException("Account not found")

		await account.updatePassword(password)
		await this.accountRepository.update(account)
	}
}

export { AccountService }

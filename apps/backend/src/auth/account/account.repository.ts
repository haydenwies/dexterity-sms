import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { AccountProvider } from "@repo/types/auth"

import { Account } from "~/auth/account/account.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { accountTable } from "~/database/database.schema"

@Injectable()
class AccountRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async findByUserIdAndProvider(userId: string, provider: AccountProvider): Promise<Account | undefined> {
		const [row] = await this.db
			.select()
			.from(accountTable)
			.where(and(eq(accountTable.userId, userId), eq(accountTable.provider, provider)))
			.limit(1)
		if (!row) return undefined

		return new Account({
			id: row.id,
			userId: row.userId,
			provider: row.provider as AccountProvider,
			providerAccountId: row.providerAccountId,
			password: row.password,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async create(account: Account): Promise<Account> {
		const [row] = await this.db
			.insert(accountTable)
			.values({
				id: account.id,
				userId: account.userId,
				provider: account.provider,
				providerAccountId: account.providerAccountId,
				password: account.password,
				createdAt: account.createdAt,
				updatedAt: account.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create account")

		return new Account({
			id: row.id,
			userId: row.userId,
			provider: row.provider,
			providerAccountId: row.providerAccountId,
			password: row.password,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async update(account: Account): Promise<Account> {
		const [row] = await this.db
			.update(accountTable)
			.set({
				provider: account.provider,
				providerAccountId: account.providerAccountId,
				password: account.password,
				updatedAt: account.updatedAt
			})
			.where(eq(accountTable.id, account.id))
			.returning()
		if (!row) throw new Error("Failed to update account")

		return new Account({
			id: row.id,
			userId: row.userId,
			provider: row.provider as AccountProvider,
			providerAccountId: row.providerAccountId,
			password: row.password,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { AccountRepository }

import { compare, hash } from "bcrypt"

import { AccountProvider } from "@repo/types/auth/enum"
import { isEnumValue } from "@repo/utils"

type AccountConstructorParams = {
	id: string
	userId: string
	provider: AccountProvider | string
	providerAccountId: string
	password?: string | null
	createdAt: Date
	updatedAt: Date
}

type AccountCreateParams = {
	userId: string
	provider: AccountProvider
	providerAccountId: string
	password: string
}

class Account {
	public readonly id: string
	public readonly userId: string
	public readonly provider: AccountProvider
	public readonly providerAccountId: string
	private _password?: string
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: AccountConstructorParams) {
		if (!isEnumValue(AccountProvider, params.provider)) throw new Error("Invalid account provider")

		this.id = params.id
		this.userId = params.userId
		this.provider = params.provider
		this.providerAccountId = params.providerAccountId
		this._password = params.password || undefined
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get password(): string | undefined {
		return this._password
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static async create(params: AccountCreateParams): Promise<Account> {
		const { password, ...rest } = params

		let hashedPassword: string | undefined
		if (rest.provider === AccountProvider.CREDENTIALS) hashedPassword = await hash(password, 10)
		else hashedPassword = undefined

		return new Account({
			id: crypto.randomUUID(),
			userId: rest.userId,
			provider: rest.provider,
			providerAccountId: rest.providerAccountId,
			password: hashedPassword,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	async verifyPassword(password: string): Promise<boolean> {
		if (!this._password) return false

		const isVerified = await compare(password, this._password)

		return isVerified
	}

	async updatePassword(password: string) {
		if (this.provider !== AccountProvider.CREDENTIALS) throw new Error("Invalid account provider")

		const hashedPassword = await hash(password, 10)
		this._password = hashedPassword

		this._updatedAt = new Date()
	}
}

export { Account, type AccountCreateParams }

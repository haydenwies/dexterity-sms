import { compare, hash } from "bcrypt"

type UserConstructorParams = {
	id: string
	firstName?: string
	lastName?: string
	email: string
	hashedPassword: string
	createdAt: Date
	updatedAt: Date
}

type UserCreateParams = {
	firstName?: string
	lastName?: string
	email: string
	password: string
}

class User {
	public readonly id: string
	public readonly firstName?: string
	public readonly lastName?: string
	public readonly email: string
	private _hashedPassword: string
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: UserConstructorParams) {
		this.id = params.id
		this.firstName = params.firstName
		this.lastName = params.lastName
		this.email = params.email
		this._hashedPassword = params.hashedPassword
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	static async create(params: UserCreateParams): Promise<User> {
		const { password, ...rest } = params
		const hashedPassword = await hash(password, 10)

		return new User({
			id: crypto.randomUUID(),
			firstName: rest.firstName,
			lastName: rest.lastName,
			email: rest.email,
			hashedPassword,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	async verifyPassword(password: string): Promise<boolean> {
		const isVerified = await compare(password, this._hashedPassword)

		return isVerified
	}

	async updatePassword(password: string) {
		const hashedPassword = await hash(password, 10)
		this._hashedPassword = hashedPassword
	}
}

export { User, type UserCreateParams }

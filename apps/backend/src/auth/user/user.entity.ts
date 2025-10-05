type UserConstructorParams = {
	id: string
	firstName: string
	lastName: string
	email: string
	createdAt: Date
	updatedAt: Date
}

type UserCreateParams = {
	firstName: string
	lastName: string
	email: string
}

class User {
	public readonly id: string
	public readonly firstName: string
	public readonly lastName: string
	public readonly email: string
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: UserConstructorParams) {
		this.id = params.id
		this.firstName = params.firstName
		this.lastName = params.lastName
		this.email = params.email
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	static async create(params: UserCreateParams): Promise<User> {
		return new User({
			id: crypto.randomUUID(),
			firstName: params.firstName,
			lastName: params.lastName,
			email: params.email,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}
}

export { User, type UserCreateParams }

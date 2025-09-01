type SessionConstructorParams = {
	id: string
	userId: string
	expiresAt: Date
	createdAt: Date
	updatedAt: Date
}

class Session {
	public readonly id: string
	public readonly userId: string
	public readonly expiresAt: Date
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: SessionConstructorParams) {
		this.id = params.id
		this.userId = params.userId
		this.expiresAt = params.expiresAt
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}
}

export { Session }

type VerificationTokenConstructorParams = {
	id: string
	type: string
	value: string
	expiresAt: Date
	createdAt: Date
	updatedAt: Date
}

type VerificationTokenCreateParams = {
	type: string
	value: string
	expiresAt?: Date
}

class VerificationToken {
	public readonly id: string
	public readonly type: string
	public readonly value: string
	public readonly expiresAt: Date
	public readonly createdAt: Date
	public readonly updatedAt: Date

	private static readonly DEFAULT_EXPIRY_LENGTH = 1000 * 60 * 60 // 1 hour

	constructor(params: VerificationTokenConstructorParams) {
		this.id = params.id
		this.type = params.type
		this.value = params.value
		this.expiresAt = params.expiresAt
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	static create(params: VerificationTokenCreateParams): VerificationToken {
		return new VerificationToken({
			id: crypto.randomUUID(),
			type: params.type,
			value: params.value,
			expiresAt: params.expiresAt || new Date(Date.now() + VerificationToken.DEFAULT_EXPIRY_LENGTH),
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	isExpired(): boolean {
		return this.expiresAt <= new Date()
	}
}

export { VerificationToken, type VerificationTokenCreateParams }

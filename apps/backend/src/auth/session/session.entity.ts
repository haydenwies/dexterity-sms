type SessionConstructorParams = {
	id: string
	userId: string
	organizationId?: string
	expiresAt: Date
	createdAt: Date
	updatedAt: Date
}

type SessionCreateParams = {
	userId: string
	organizationId?: string
}

class Session {
	public readonly id: string
	public readonly userId: string
	private _organizationId?: string
	public readonly expiresAt: Date
	public readonly createdAt: Date
	public readonly updatedAt: Date

	private static readonly DEFAULT_EXPIRY_LENGTH = 1000 * 60 * 60 * 24 * 30 // 30 days

	constructor(params: SessionConstructorParams) {
		this.id = params.id
		this.userId = params.userId
		this._organizationId = params.organizationId
		this.expiresAt = params.expiresAt
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	get organizationId(): string | undefined {
		return this._organizationId
	}

	static create(params: SessionCreateParams): Session {
		return new Session({
			id: crypto.randomUUID(),
			userId: params.userId,
			organizationId: params.organizationId,
			expiresAt: new Date(Date.now() + Session.DEFAULT_EXPIRY_LENGTH),
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	isExpired(): boolean {
		return this.expiresAt > new Date()
	}
}

export { Session, type SessionCreateParams }

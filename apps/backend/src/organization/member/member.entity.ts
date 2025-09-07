type MemberConstructorParams = {
	userId: string
	organizationId: string
	createdAt: Date
	updatedAt: Date
}

type MemberCreateParams = {
	userId: string
	organizationId: string
}

class Member {
	public readonly userId: string
	public readonly organizationId: string
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: MemberConstructorParams) {
		this.userId = params.userId
		this.organizationId = params.organizationId
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	static create(params: MemberCreateParams): Member {
		return new Member({
			userId: params.userId,
			organizationId: params.organizationId,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}
}

export { Member }

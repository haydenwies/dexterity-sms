type OrganizationUserConstructorParams = {
	userId: string
	organizationId: string
	createdAt: Date
	updatedAt: Date
}

type OrganizationUserCreateParams = {
	userId: string
	organizationId: string
}

class OrganizationUser {
	public readonly userId: string
	public readonly organizationId: string
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: OrganizationUserConstructorParams) {
		this.userId = params.userId
		this.organizationId = params.organizationId
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	static create(params: OrganizationUserCreateParams): OrganizationUser {
		return new OrganizationUser({
			userId: params.userId,
			organizationId: params.organizationId,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}
}

export { OrganizationUser }

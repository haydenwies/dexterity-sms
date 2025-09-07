import z from "zod"

type OrganizationConstructorParams = {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}

type OrganizationCreateParams = {
	name: string
}

type OrganizationUpdateParams = {
	name: string
}

class Organization {
	public readonly id: string
	private _name: string
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: OrganizationConstructorParams) {
		this.id = params.id
		this._name = params.name
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get name(): string {
		return this._name
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: OrganizationCreateParams): Organization {
		return new Organization({
			id: crypto.randomUUID(),
			name: Organization.validateName(params.name),
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: OrganizationUpdateParams) {
		this._name = params.name
		this._updatedAt = new Date()
	}

	private static validateName(name: string): string {
		const parseRes = z.string().min(1).safeParse(name)
		if (!parseRes.success) throw new Error("Invalid organization name")

		return parseRes.data
	}
}

export { Organization }

import z from "zod"

type OrganizationConstructorParams = {
	id: string
	externalBillingId?: string | null
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
}

type OrganizationCreateParams = {
	name: string
	email: string
}

type OrganizationUpdateParams = {
	name: string
	email: string
}

class Organization {
	public readonly id: string
	private _name: string
	private _email: string
	private _externalBillingId?: string
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: OrganizationConstructorParams) {
		this.id = params.id
		this._name = params.name
		this._email = params.email
		this._externalBillingId = params.externalBillingId || undefined
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get name(): string {
		return this._name
	}

	get email(): string {
		return this._email
	}

	get externalBillingId(): string | undefined {
		return this._externalBillingId
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: OrganizationCreateParams): Organization {
		return new Organization({
			id: crypto.randomUUID(),
			name: Organization.validateName(params.name),
			email: Organization.validateEmail(params.email),
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: OrganizationUpdateParams) {
		this._name = params.name
		this._email = params.email
		this._updatedAt = new Date()
	}

	updateExternalBillingId(externalBillingAccountId: string) {
		this._externalBillingId = externalBillingAccountId
		this._updatedAt = new Date()
	}

	private static validateName(name: string): string {
		const parseRes = z.string().trim().min(1).safeParse(name)
		if (!parseRes.success) throw new Error("Invalid organization name")

		return parseRes.data
	}

	private static validateEmail(email: string): string {
		const parseRes = z.email().trim().safeParse(email)
		if (!parseRes.success) throw new Error("Invalid organization email")

		return parseRes.data
	}
}

export { Organization }

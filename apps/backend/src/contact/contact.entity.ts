type ContactConstructorParams = {
	id: string
	organizationId: string
	firstName?: string | null
	lastName?: string | null
	email?: string | null
	phone?: string | null
	createdAt: Date
	updatedAt: Date
}

type ContactCreateParams = {
	organizationId: string
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

type ContactUpdateParams = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

class Contact {
	public readonly id: string
	public readonly organizationId: string
	private _firstName?: string
	private _lastName?: string
	private _email?: string
	private _phone?: string
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: ContactConstructorParams) {
		this.id = params.id
		this.organizationId = params.organizationId
		this._firstName = params.firstName || undefined
		this._lastName = params.lastName || undefined
		this._email = params.email || undefined
		this._phone = params.phone || undefined
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	get firstName(): string | undefined {
		return this._firstName
	}

	get lastName(): string | undefined {
		return this._lastName
	}

	get email(): string | undefined {
		return this._email
	}

	get phone(): string | undefined {
		return this._phone
	}

	static create(params: ContactCreateParams): Contact {
		return new Contact({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			firstName: params.firstName,
			lastName: params.lastName,
			email: params.email,
			phone: params.phone,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: ContactUpdateParams): void {
		this._firstName = params.firstName || undefined
		this._lastName = params.lastName || undefined
		this._email = params.email || undefined
		this._phone = params.phone || undefined
	}
}

export { Contact }

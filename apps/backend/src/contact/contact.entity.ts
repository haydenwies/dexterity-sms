import z from "zod"

import { Email } from "~/common/email.vo"
import { Phone } from "~/common/phone.vo"

type ContactConstructorParams = {
	id: string
	organizationId: string
	firstName?: string | null
	lastName?: string | null
	email?: Email | null
	phone?: Phone | null
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
	private _email?: Email
	private _phone?: Phone
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

	get email(): Email | undefined {
		return this._email
	}

	get phone(): Phone | undefined {
		return this._phone
	}

	static create(params: ContactCreateParams): Contact {
		return new Contact({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			firstName: Contact.parseFirstName(params.firstName),
			lastName: Contact.parseLastName(params.lastName),
			email: params.email ? Email.create(params.email) : undefined,
			phone: params.phone ? Phone.create(params.phone) : undefined,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	static safeCreate(params: ContactCreateParams): Contact | undefined {
		try {
			return Contact.create(params)
		} catch {
			return undefined
		}
	}

	update(params: ContactUpdateParams): void {
		this._firstName = Contact.parseFirstName(params.firstName)
		this._lastName = Contact.parseLastName(params.lastName)
		this._email = params.email ? Email.create(params.email) : undefined
		this._phone = params.phone ? Phone.create(params.phone) : undefined
	}

	private static parseFirstName(firstName?: string | null): string | undefined {
		if (!firstName || !firstName.trim()) return undefined

		const parseRes = z.string().trim().min(1).safeParse(firstName)
		if (!parseRes.success) throw new Error("Invalid first name")

		return parseRes.data
	}

	private static parseLastName(lastName?: string | null): string | undefined {
		if (!lastName || !lastName.trim()) return undefined

		const parseRes = z.string().trim().min(1).safeParse(lastName)
		if (!parseRes.success) throw new Error("Invalid last name")

		return parseRes.data
	}
}

export { Contact }

import { Phone } from "~/common/phone.vo"

type UnsubscribeConstructorParams = {
	id: string
	organizationId: string
	phone: Phone
	unsubscribedAt: Date
	createdAt: Date
	updatedAt: Date
}

type UnsubscribeCreateParams = {
	organizationId: string
	phone: Phone
}

class Unsubscribe {
	public readonly id: string
	public readonly organizationId: string
	public readonly phone: Phone
	public readonly unsubscribedAt: Date
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: UnsubscribeConstructorParams) {
		this.id = params.id
		this.organizationId = params.organizationId
		this.phone = params.phone
		this.unsubscribedAt = params.unsubscribedAt
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}

	static create(params: UnsubscribeCreateParams): Unsubscribe {
		const now = new Date()

		return new Unsubscribe({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			phone: params.phone,
			unsubscribedAt: now,
			createdAt: now,
			updatedAt: now
		})
	}
}

export { Unsubscribe }

import { Phone } from "~/common/phone.vo"

type SenderConstructorParams = {
	organizationId: string
	externalId: string
	phone: Phone
	createdAt: Date
}

type SenderCreateParams = {
	organizationId: string
	externalId: string
	phone: Phone
}

class Sender {
	public readonly organizationId: string
	public readonly externalId: string
	public readonly phone: Phone
	public readonly createdAt: Date

	constructor(params: SenderConstructorParams) {
		this.organizationId = params.organizationId
		this.externalId = params.externalId
		this.phone = params.phone
		this.createdAt = params.createdAt
	}

	static create(params: SenderCreateParams): Sender {
		return new Sender({
			organizationId: params.organizationId,
			externalId: params.externalId,
			phone: params.phone,
			createdAt: new Date()
		})
	}
}

export { Sender }

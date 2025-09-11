import { Phone } from "~/common/phone.vo"

type SenderConstructorParams = {
	id: string
	organizationId: string
	externalId: string
	value: Phone
	createdAt: Date
	updatedAt: Date
}

class Sender {
	public readonly id: string
	public readonly organizationId: string
	public readonly externalId: string
	public readonly value: Phone
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: SenderConstructorParams) {
		this.id = params.id
		this.organizationId = params.organizationId
		this.externalId = params.externalId
		this.value = params.value
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
	}
}

export { Sender }

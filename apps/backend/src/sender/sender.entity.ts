import { Phone } from "~/common/phone.vo"

type SenderConstructorParams = {
	organizationId?: string | null
	phone: Phone
	createdAt: Date
}

type SenderCreateParams = {
	organizationId?: string | null
	phone: Phone
}

class Sender {
	public readonly organizationId: string | null
	public readonly phone: Phone
	public readonly createdAt: Date

	constructor(params: SenderConstructorParams) {
		this.organizationId = params.organizationId || null
		this.phone = params.phone
		this.createdAt = params.createdAt
	}

	static create(params: SenderCreateParams): Sender {
		return new Sender({
			organizationId: params.organizationId || null,
			phone: params.phone,
			createdAt: new Date()
		})
	}
}

export { Sender }

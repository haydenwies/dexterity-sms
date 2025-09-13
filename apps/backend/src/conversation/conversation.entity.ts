import { Phone } from "~/common/phone.vo"

type ConversationConstructorParams = {
	id: string
	organizationId: string
	recipient: Phone
}

type ConversationCreateParams = {
	organizationId: string
	recipient: Phone
}

class Conversation {
	public readonly id: string
	public readonly organizationId: string
	public readonly recipient: Phone

	constructor(params: ConversationConstructorParams) {
		this.id = params.id
		this.organizationId = params.organizationId
		this.recipient = params.recipient
	}

	static create(params: ConversationCreateParams): Conversation {
		return new Conversation({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			recipient: params.recipient
		})
	}
}

export { Conversation }

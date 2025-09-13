import { Phone } from "~/common/phone.vo"

type ConversationConstructorParams = {
	id: string
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
}

export { Conversation }

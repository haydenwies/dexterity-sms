import { MailerAdapter, MailerAdapterSendParams } from "./adapter"

type SendgridAdapterConstructorParams = {
	apiKey: string
}

class SendgridAdapter implements MailerAdapter {
	private readonly apiKey: string

	constructor(params: SendgridAdapterConstructorParams) {
		this.apiKey = params.apiKey
	}

	async send(params: MailerAdapterSendParams) {}
}

const sendgridAdapter = (params: SendgridAdapterConstructorParams): MailerAdapter => new SendgridAdapter(params)

export { sendgridAdapter }

import { MailerAdapter } from "./adapter"

type MailerConstructorParams = {
	adapter: MailerAdapter
}

type MailerSendParams = {
	to: string
	from: string
	subject: string
	html?: string
	text: string
}

class Mailer {
	private readonly adapter: MailerAdapter

	constructor(params: MailerConstructorParams) {
		this.adapter = params.adapter
	}

	async send(params: MailerSendParams) {
		await this.adapter.send(params)
	}
}

export { Mailer }

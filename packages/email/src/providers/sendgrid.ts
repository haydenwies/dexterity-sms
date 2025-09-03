import sg, { type MailService } from "@sendgrid/mail"

import { EmailPayload, EmailProvider } from "../types"

type SendGridConfig = {
	apiKey: string
}

class SendGridProvider implements EmailProvider {
	private readonly client: MailService

	constructor(config: SendGridConfig) {
		this.client = sg
		this.client.setApiKey(config.apiKey)
	}

	async send(payload: EmailPayload): Promise<void> {
		await this.client.send({
			to: payload.to,
			from: payload.from,
			subject: payload.subject,
			text: payload.text,
			html: payload.html
		})
	}
}

export { SendGridProvider }

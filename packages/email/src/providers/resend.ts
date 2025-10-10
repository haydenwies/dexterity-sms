import { Resend } from "resend"

import { EmailPayload, EmailProvider } from "../types"

type ResendProviderConfig = {
	apiKey: string
	from: string
}

class ResendProvider implements EmailProvider {
	private readonly client: Resend
	private readonly from: string

	constructor(private readonly resend: ResendProviderConfig) {
		this.from = resend.from

		this.client = new Resend(resend.apiKey)
	}

	async send(payload: EmailPayload): Promise<void> {
		await this.client.emails.send({
			from: this.from,
			to: payload.to,
			subject: payload.subject,
			html: payload.html
		})
	}
}

export { ResendProvider }

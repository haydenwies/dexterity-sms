import { Injectable } from "@nestjs/common"

import { forgotPassword, type ForgotPasswordProps } from "@repo/email/templates"

@Injectable()
class EmailService {
	async sendForgotPassword(to: string, params: ForgotPasswordProps): Promise<void> {
		const { html, text } = await forgotPassword(params)

		// TODO Add email provider
		console.log("Sending email to", to, "\n", html, "\n", text)
	}
}

export { EmailService }

import { Injectable } from "@nestjs/common"

import { forgotPassword, type ForgotPasswordParams } from "@repo/email-templates"

@Injectable()
class EmailService {
	async sendForgotPassword(to: string, params: ForgotPasswordParams): Promise<void> {
		const { html, text } = await forgotPassword(params)
		console.log("Sending email to", to, "\n", html, "\n", text)
	}
}

export { EmailService }

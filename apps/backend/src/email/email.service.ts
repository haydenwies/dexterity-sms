import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { type EmailProvider } from "@repo/email"
import { ResendProvider } from "@repo/email/providers/resend"
import { resetPassword, type ResetPasswordProps } from "@repo/email/templates"

@Injectable()
class EmailService {
	private readonly logger = new Logger(EmailService.name)
	private readonly emailProvider: EmailProvider

	constructor(private readonly configService: ConfigService) {
		this.emailProvider = new ResendProvider({
			apiKey: this.configService.getOrThrow<string>("email.resendApiKey"),
			from: this.configService.getOrThrow<string>("email.resendFrom")
		})
	}
	async sendResetPassword(to: string, params: ResetPasswordProps): Promise<void> {
		const { html, text } = await resetPassword(params)

		try {
			await this.emailProvider.send({
				to,
				subject: "Reset Your Password",
				html,
				plainText: text
			})

			this.logger.log("Forgot password email sent to", to)
		} catch (err: unknown) {
			this.logger.error("Error sending forgot password email", err)
			throw err
		}
	}
}

export { EmailService }

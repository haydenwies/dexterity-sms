import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { type EmailProvider } from "@repo/email"
import { AwsSesProvider } from "@repo/email/providers/aws-ses"
import { forgotPassword, type ForgotPasswordProps } from "@repo/email/templates"

@Injectable()
class EmailService {
	private readonly logger = new Logger(EmailService.name)
	private readonly emailProvider: EmailProvider

	constructor(private readonly configService: ConfigService) {
		this.emailProvider = new AwsSesProvider({
			region: "us-east-1",
			accessKeyId: this.configService.getOrThrow<string>("email.awsSesAccessKeyId"),
			secretAccessKey: this.configService.getOrThrow<string>("email.awsSesSecretAccessKey"),
			sourceEmail: this.configService.getOrThrow<string>("email.awsSesSourceEmail")
		})
	}
	async sendForgotPassword(to: string, params: ForgotPasswordProps): Promise<void> {
		const { html, text } = await forgotPassword(params)

		try {
			await this.emailProvider.send({
				to,
				subject: "Forgot Password",
				html,
				plainText: text
			})
		} catch (err: unknown) {
			this.logger.error("Error sending forgot password email", err)
			throw err
		}
	}
}

export { EmailService }

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { EmailPayload, EmailProvider } from "../types"

type SesProviderConfig = {
	region?: string
	accessKeyId: string
	secretAccessKey: string
	sourceEmail: string
}

class SesProvider implements EmailProvider {
	private readonly client: SESClient
	private readonly sourceEmail: string

	constructor(config: SesProviderConfig) {
		this.sourceEmail = config.sourceEmail

		this.client = new SESClient({
			region: config.region || "us-east-1",
			credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey
			}
		})
	}

	readonly send = async (payload: EmailPayload): Promise<void> => {
		const command = new SendEmailCommand({
			Source: this.sourceEmail,
			Destination: {
				ToAddresses: [payload.to]
			},
			Message: {
				Subject: {
					Data: payload.subject,
					Charset: "UTF-8"
				},
				Body: {
					Html: {
						Data: payload.html,
						Charset: "UTF-8"
					},
					Text: {
						Data: payload.plainText,
						Charset: "UTF-8"
					}
				}
			}
		})

		await this.client.send(command)
	}
}

export { SesProvider }

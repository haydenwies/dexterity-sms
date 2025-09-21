import twilio, { validateRequest, type Twilio } from "twilio"

import type { InboundWebhookEvent, Message, Sender, SmsPayload, SmsProvider, StatusWebhookEvent } from "../types"

type TwilioConfig = {
	accountSid: string
	authToken: string
}

class TwilioProvider implements SmsProvider {
	private readonly authToken: string
	private readonly client: Twilio

	constructor(config: TwilioConfig) {
		this.authToken = config.authToken
		this.client = twilio(config.accountSid, config.authToken)
	}

	async send(payload: SmsPayload): Promise<Message> {
		const message = await this.client.messages.create({
			from: payload.from,
			to: payload.to,
			body: payload.body,
			statusCallback: payload.statusCallback
		})

		return {
			id: message.sid,
			from: message.from,
			to: message.to,
			body: message.body
		}
	}

	async getAvailableNumbers(): Promise<string[]> {
		const availableNumbers = await this.client.availablePhoneNumbers("CA").local.list({ smsEnabled: true })

		return availableNumbers.map((number) => number.phoneNumber)
	}

	async buyNumber(phone: string): Promise<Sender> {
		const res = await this.client.incomingPhoneNumbers.create({ phoneNumber: phone })

		return {
			id: res.sid,
			phone: res.phoneNumber
		}
	}

	async releaseNumber(senderId: string): Promise<void> {
		await this.client.incomingPhoneNumbers(senderId).remove()
	}

	validateWebhook(headers: Record<string, string>, body: any, url: string): boolean {
		const twilioHeader = headers["x-twilio-signature"]
		if (!twilioHeader) return false

		const isValid = validateRequest(this.authToken, twilioHeader, url, body)

		return isValid
	}

	parseStatusWebhookPayload(payload: any): StatusWebhookEvent | null {
		try {
			// Validate message ID
			const messageId = payload["MessageSid"]
			if (!messageId || typeof messageId !== "string") return null

			// Validate and map message status
			const twilioStatus = payload["MessageStatus"]
			if (!twilioStatus || typeof twilioStatus !== "string") return null
			const status = this.mapTwilioStatusToGeneric(twilioStatus)
			if (!status) return null

			// Validate error code
			const errorCode = payload["ErrorCode"]
			if (errorCode && typeof errorCode !== "string") return null

			// Validate error message
			const errorMessage = payload["ErrorMessage"]
			if (errorMessage && typeof errorMessage !== "string") return null

			return {
				messageId,
				status,
				timestamp: new Date(), // Twilio doesn't provide timestamp in webhook, use current time
				errorCode,
				errorMessage
			}
		} catch {
			return null
		}
	}

	parseInboundWebhookPayload(payload: any): InboundWebhookEvent | null {
		try {
			// Validate message ID
			const messageId = payload["MessageSid"]
			if (!messageId || typeof messageId !== "string") return null

			// Validate from phone number
			const from = payload["From"]
			if (!from || typeof from !== "string") return null

			// Validate to phone number
			const to = payload["To"]
			if (!to || typeof to !== "string") return null

			// Validate message body
			const body = payload["Body"]
			if (!body || typeof body !== "string") return null

			return {
				messageId,
				from,
				to,
				body,
				timestamp: new Date() // Twilio doesn't provide timestamp in webhook, use current time
			}
		} catch {
			return null
		}
	}

	private mapTwilioStatusToGeneric(twilioStatus: string): StatusWebhookEvent["status"] | null {
		const statusMap = {
			PENDING: ["accepted", "scheduled", "queued", "sending"],
			SENT: ["sent"],
			DELIVERED: ["delivered"],
			FAILED: ["failed", "undelivered", "delivery_unknown"]
		}

		if (statusMap.PENDING.includes(twilioStatus)) return "pending"
		else if (statusMap.SENT.includes(twilioStatus)) return "sent"
		else if (statusMap.DELIVERED.includes(twilioStatus)) return "delivered"
		else if (statusMap.FAILED.includes(twilioStatus)) return "failed"
		else return null
	}
}

export { TwilioProvider }

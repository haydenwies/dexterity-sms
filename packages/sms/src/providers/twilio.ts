import twilio, { validateRequest, type Twilio } from "twilio"

import { MessageErrorCode, MessageStatus } from "@repo/types/message"
import type { InboundWebhookEvent, Message, Sender, SmsPayload, SmsProvider, StatusWebhookEvent } from "../types"

type TwilioConfig = {
	accountSid: string
	authToken: string
}

class TwilioProvider implements SmsProvider {
	private readonly authToken: string
	private readonly client: Twilio

	private readonly statusMap: Record<string, MessageStatus> = {
		"accepted": MessageStatus.PROCESSING,
		"scheduled": MessageStatus.PROCESSING,
		"queued": MessageStatus.PROCESSING,
		"sending": MessageStatus.PROCESSING,
		"sent": MessageStatus.SENT,
		"delivered": MessageStatus.DELIVERED,
		"failed": MessageStatus.FAILED,
		"undelivered": MessageStatus.FAILED,
		"delivery_unknown": MessageStatus.FAILED
	}

	private readonly errorCodeMap: Record<string, MessageErrorCode> = {
		"21610": MessageErrorCode.UNSUBSCRIBED,
		"30003": MessageErrorCode.TEMPORARY_UNREACHABLE_DESTINATION,
		"30005": MessageErrorCode.PERMANENT_UNREACHABLE_DESTINATION,
		"30006": MessageErrorCode.PERMANENT_UNREACHABLE_DESTINATION,
		"30007": MessageErrorCode.MESSAGE_FILTERED,
		"30008": MessageErrorCode.UNKNOWN
	}

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

	// #region Sender

	async getAvailableNumbers(): Promise<string[]> {
		const availableNumbers = await this.client.availablePhoneNumbers("CA").local.list({ smsEnabled: true })

		return availableNumbers.map((number) => number.phoneNumber)
	}

	async buyNumber(phone: string, options?: { inboundCallbackUrl?: string }): Promise<Sender> {
		const res = await this.client.incomingPhoneNumbers.create({
			phoneNumber: phone,
			smsUrl: options?.inboundCallbackUrl
		})

		return {
			id: res.sid,
			phone: res.phoneNumber
		}
	}

	async releaseNumber(senderId: string): Promise<void> {
		await this.client.incomingPhoneNumbers(senderId).remove()
	}

	// #endregion

	// #region Webhook

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

			// Map message status
			const twilioStatus = payload["MessageStatus"]
			if (!twilioStatus) return null
			const twilioStatusStr = String(twilioStatus)
			const status = this.statusMap[twilioStatusStr]
			if (!status) return null

			// Map error code
			let errorCode: MessageErrorCode | undefined = undefined
			const twilioErrorCode = payload["ErrorCode"]
			if (twilioErrorCode) {
				const twilioErrorCodeStr = String(twilioErrorCode)
				errorCode = this.errorCodeMap[twilioErrorCodeStr]
				if (!errorCode) errorCode = MessageErrorCode.UNKNOWN
			}

			return {
				messageId,
				status,
				timestamp: new Date(),
				errorCode
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

	// #endregion
}

export { TwilioProvider }

import twilio, { type Twilio } from "twilio"

import { PurchasedNumber, type Message, type SmsPayload, type SmsProvider } from "../types"

type TwilioConfig = {
	accountSid: string
	authToken: string
}

class TwilioProvider implements SmsProvider {
	private readonly client: Twilio

	constructor(config: TwilioConfig) {
		this.client = twilio(config.accountSid, config.authToken)
	}

	async send(payload: SmsPayload): Promise<Message> {
		const message = await this.client.messages.create({
			from: payload.from.value,
			to: payload.to.value,
			body: payload.body
		})

		return {
			id: message.sid,
			from: { value: message.from },
			to: { value: message.to },
			body: message.body
		}
	}

	async getAvailableNumbers(): Promise<string[]> {
		const availableNumbers = await this.client.availablePhoneNumbers("CA").local.list({ smsEnabled: true })

		return availableNumbers.map((number) => number.phoneNumber)
	}

	async buyNumber(phone: string): Promise<PurchasedNumber> {
		const res = await this.client.incomingPhoneNumbers.create({ phoneNumber: phone })

		return {
			id: res.sid,
			phone: res.phoneNumber
		}
	}

	async releaseNumber(phone: string): Promise<void> {
		await this.client.incomingPhoneNumbers(phone).remove()
	}
}

export { TwilioProvider }

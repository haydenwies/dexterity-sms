type Phone = {
	value: string
}

type SmsPayload = {
	from: Phone
	to: Phone
	body: string
}

type Message = {
	id: string
	from: Phone
	to: Phone
	body: string
}

type PurchasedNumber = {
	id: string
	phone: string
}

type SmsProvider = {
	send: (payload: SmsPayload) => Promise<Message>
	getAvailableNumbers: () => Promise<string[]>
	buyNumber: (phone: string) => Promise<PurchasedNumber>
	releaseNumber: (id: string) => Promise<void>
}

export type { Message, Phone, PurchasedNumber, SmsPayload, SmsProvider }

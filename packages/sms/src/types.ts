type SmsPayload = {
	from: string
	to: string
	body: string
}

type Message = {
	id: string
	from: string
	to: string
	body: string
}

type Sender = {
	id: string
	phone: string
}

type SmsProvider = {
	send: (payload: SmsPayload) => Promise<Message>
	getAvailableNumbers: () => Promise<string[]>
	buyNumber: (phone: string) => Promise<Sender>
	releaseNumber: (senderId: string) => Promise<void>
}

export type { Message, Sender, SmsPayload, SmsProvider }

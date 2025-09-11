type SmsPayload = {
	from: string
	to: string
	body: string
}

type SmsResponse = {}

type SmsProvider = {
	send: (payload: SmsPayload) => Promise<SmsResponse>
}

export type { SmsPayload, SmsProvider, SmsResponse }

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

type StatusWebhookEvent = {
	messageId: string // External ID from provider
	status: "pending" | "sent" | "delivered" | "failed"
	timestamp: Date
	errorCode?: string
	errorMessage?: string
}

type SmsProvider = {
	send: (payload: SmsPayload) => Promise<Message>
	getAvailableNumbers: () => Promise<string[]>
	buyNumber: (phone: string) => Promise<Sender>
	releaseNumber: (senderId: string) => Promise<void>
	validateWebhook: (headers: Record<string, string>, body: any, url: string) => boolean
	parseStatusWebhookPayload: (payload: unknown) => StatusWebhookEvent | null
}

export type { Message, Sender, SmsPayload, SmsProvider, StatusWebhookEvent }

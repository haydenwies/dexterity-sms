import { MessageErrorCode, MessageStatus } from "@repo/types/message"

type SmsPayload = {
	from: string
	to: string
	body: string
	statusCallback?: string
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
	status: MessageStatus
	timestamp: Date
	errorCode?: MessageErrorCode
}

type InboundWebhookEvent = {
	messageId: string // External ID from provider
	from: string // Sender phone number
	to: string // Recipient phone number (our number)
	body: string // Message content
	timestamp: Date // When message was received
}

type SmsProvider = {
	send: (payload: SmsPayload) => Promise<Message>
	getAvailableNumbers: () => Promise<string[]>
	buyNumber: (phone: string, options?: { inboundCallbackUrl?: string }) => Promise<Sender>
	releaseNumber: (senderId: string) => Promise<void>
	validateWebhook: (headers: Record<string, string>, body: any, url: string) => boolean
	parseStatusWebhookPayload: (payload: unknown) => StatusWebhookEvent | null
	parseInboundWebhookPayload: (payload: unknown) => InboundWebhookEvent | null
}

export type { InboundWebhookEvent, Message, Sender, SmsPayload, SmsProvider, StatusWebhookEvent }

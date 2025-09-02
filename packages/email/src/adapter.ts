type MailerAdapterSendParams = {
	to: string
	from: string
	subject: string
	html?: string
	text: string
}

interface MailerAdapter {
	send: (params: MailerAdapterSendParams) => Promise<void>
}

export type { MailerAdapter, MailerAdapterSendParams }

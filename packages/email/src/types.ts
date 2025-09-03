type EmailPayload = {
	to: string
	from: string
	subject: string
	text: string
	html: string
}

type EmailProvider = {
	send: (payload: EmailPayload) => Promise<void>
}

export type { EmailPayload, EmailProvider }

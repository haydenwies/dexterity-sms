type EmailPayload = {
	to: string
	subject: string
	html: string
	plainText: string
}

type EmailProvider = {
	send: (payload: EmailPayload) => Promise<void>
}

export type { EmailPayload, EmailProvider }

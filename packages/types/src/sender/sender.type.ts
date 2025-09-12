type SenderModel = {
	id: string
	organizationId: string | null
	value: string
	createdAt: Date
}

type AvailableSenderModel = {
	id: string
	value: string
	countryCode: string
}

export type { AvailableSenderModel, SenderModel }

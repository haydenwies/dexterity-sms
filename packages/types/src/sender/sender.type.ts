type SenderModel = {
	id: string
	organizationId: string
	value: string
	createdAt: Date
}

type AvailableSenderModel = {
	id: string
	value: string
	countryCode: string
}

export type { AvailableSenderModel, SenderModel }

type ContactModel = {
	id: string
	organizationId: string
	tagIds?: string[]
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
	createdAt: Date
	updatedAt: Date
}

type ContactTagModel = {
	id: string
	organizationId: string
	name: string
	color?: string
	createdAt: Date
	updatedAt: Date
}

export type { ContactModel, ContactTagModel }

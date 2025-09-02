type UserDto = {
	id: string
	firstName?: string
	lastName?: string
	email: string
	createdAt: Date
	updatedAt: Date
}

type SessionDto = {
	id: string
	userId: string
	organizationId?: string
	createdAt: Date
	updatedAt: Date
}

export type { SessionDto, UserDto }

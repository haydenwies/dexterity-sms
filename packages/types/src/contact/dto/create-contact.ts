import z from "zod"

type CreateContactDto = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

const createContactDtoSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.email().optional(),
	phone: z.e164().optional()
})

export { createContactDtoSchema, type CreateContactDto }

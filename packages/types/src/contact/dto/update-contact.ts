import z from "zod"

type UpdateContactDto = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

const updateContactDtoSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.email().optional(),
	phone: z.e164().optional()
})

export { updateContactDtoSchema, type UpdateContactDto }

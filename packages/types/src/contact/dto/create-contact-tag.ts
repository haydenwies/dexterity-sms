import z from "zod"

type CreateContactTagDto = {
	id?: string
	name: string
	color?: string
}

const createContactTagDtoSchema = z.object({
	name: z.string().min(1),
	color: z.string().optional()
})

export { createContactTagDtoSchema, type CreateContactTagDto }

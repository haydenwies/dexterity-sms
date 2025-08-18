import z from "zod"

type CreateTagDto = {
	id?: string
	name: string
	color?: string
}

const createTagDtoSchema = z.object({
	name: z.string().min(1),
	color: z.string().optional()
})

export { createTagDtoSchema, type CreateTagDto }

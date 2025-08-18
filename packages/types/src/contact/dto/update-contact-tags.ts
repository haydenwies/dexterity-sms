import z from "zod"

type UpdateContactTagsDto = {
	contactId: string
	tagIds: string[]
}

const updateContactTagsDtoSchema = z.object({
	contactId: z.string(),
	tagIds: z.array(z.string())
})

export { updateContactTagsDtoSchema, type UpdateContactTagsDto }

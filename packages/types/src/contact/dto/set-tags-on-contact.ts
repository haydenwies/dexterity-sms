import z from "zod"

type SetTagsOnContactDto = {
	contactId: string
	tagIds: string[]
}

const setTagsOnContactDtoSchema = z.object({
	contactId: z.string(),
	tagIds: z.array(z.string())
})

export { setTagsOnContactDtoSchema, type SetTagsOnContactDto }

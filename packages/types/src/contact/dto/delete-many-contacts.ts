import z from "zod"

type DeleteManyContactsDto = {
	ids: string[]
}

const deleteManyContactsDtoSchema = z.object({
	ids: z.array(z.string())
})

export { deleteManyContactsDtoSchema, type DeleteManyContactsDto }

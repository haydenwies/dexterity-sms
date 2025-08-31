import z from "zod"

type RemoveSenderDto = {
	senderId: string
}

const removeSenderDtoSchema = z.object({
	senderId: z.string()
})

export { removeSenderDtoSchema, type RemoveSenderDto }

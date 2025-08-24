import z from "zod"

type CreateConversationDto = {
	contactId: string
}

const createConversationDtoSchema = z.object({
	contactId: z.string()
})

export { createConversationDtoSchema, type CreateConversationDto }

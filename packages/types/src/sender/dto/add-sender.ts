import z from "zod"

type AddSenderDto = {
	availableSenderId: string
}

const addSenderDtoSchema = z.object({
	availableSenderId: z.string()
})

export { addSenderDtoSchema, type AddSenderDto }

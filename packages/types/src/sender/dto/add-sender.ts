import z from "zod"

type AddSenderDto = {
	phone: string
}

const addSenderDtoSchema = z.object({
	phone: z.e164()
})

export { addSenderDtoSchema, type AddSenderDto }

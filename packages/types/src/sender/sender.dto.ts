import z from "zod"

// #region AddSenderDto

type AddSenderDto = {
	phone: string
}

const addSenderDtoSchema = z.object({
	phone: z.e164()
})

// #endregion

export { addSenderDtoSchema, type AddSenderDto }

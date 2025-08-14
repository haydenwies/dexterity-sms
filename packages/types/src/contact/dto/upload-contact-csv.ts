import z from "zod"

type UploadContactCsvDto = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

const uploadContactCsvDtoSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional()
})

export { uploadContactCsvDtoSchema, type UploadContactCsvDto }

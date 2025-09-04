import z from "zod"

type CreateOrganizationDto = {
	name: string
}

const createOrganizationDtoSchema = z.object({
	name: z.string().min(1)
})

export { createOrganizationDtoSchema, type CreateOrganizationDto }

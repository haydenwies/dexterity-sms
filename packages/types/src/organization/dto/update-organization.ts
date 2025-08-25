import z from "zod"

type UpdateOrganizationDto = {
	name: string
}

const updateOrganizationDtoSchema = z.object({
	name: z.string().min(1)
})

export { updateOrganizationDtoSchema, type UpdateOrganizationDto }

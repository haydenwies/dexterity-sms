import z from "zod"

type UpdateCampaignDto = {
	name?: string
	body?: string
}

const updateCampaignDtoSchema = z.object({
	name: z.string().optional(),
	body: z.string().optional()
})

export { updateCampaignDtoSchema, type UpdateCampaignDto }

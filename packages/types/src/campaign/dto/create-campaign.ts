import z from "zod"

type CreateCampaignDto = {
	name: string
	body?: string
}

const createCampaignDtoSchema = z.object({
	name: z.string(),
	body: z.string().optional()
})

export { createCampaignDtoSchema, type CreateCampaignDto }

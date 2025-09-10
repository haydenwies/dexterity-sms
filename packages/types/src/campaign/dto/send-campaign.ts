import z from "zod"

type SendCampaignDto = {
	scheduledAt?: Date
}

const sendCampaignDtoSchema = z.object({
	scheduledAt: z.date().optional()
})

export { sendCampaignDtoSchema, type SendCampaignDto }

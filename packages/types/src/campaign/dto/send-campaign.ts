import z from "zod"

type SendCampaignDto = {
	campaignId: string
	scheduledAt?: Date
	contactTagIds?: string[]
}

const sendCampaignDtoSchema = z.object({
	campaignId: z.string(),
	scheduledAt: z.date().optional(),
	contactTagIds: z.array(z.string()).optional()
})

export { sendCampaignDtoSchema, type SendCampaignDto }

import z from "zod"

type SendTestCampaignDto = {
	campaignId: string
	to: string
}

const sendTestCampaignDtoSchema = z.object({
	campaignId: z.string(),
	to: z.e164()
})

export { sendTestCampaignDtoSchema, type SendTestCampaignDto }

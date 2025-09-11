import z from "zod"

type SendTestCampaignDto = {
	to: string
}

const sendTestCampaignDtoSchema = z.object({
	to: z.e164()
})

export { sendTestCampaignDtoSchema, type SendTestCampaignDto }

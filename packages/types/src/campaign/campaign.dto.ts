import z from "zod"

// #region CreateCampaignDto

type CreateCampaignDto = {
	name?: string
	body?: string
}

const createCampaignDtoSchema = z.object({
	name: z.string().optional(),
	body: z.string().optional()
})

// #endregion

// #region UpdateCampaignDto

type UpdateCampaignDto = {
	name: string
	body?: string
}

const updateCampaignDtoSchema = z.object({
	name: z.string(),
	body: z.string().optional()
})

// #endregion

// #region DeleteManyCampaignsDto

type DeleteManyCampaignsDto = {
	ids: string[]
}

const deleteManyCampaignsDtoSchema = z.object({
	ids: z.array(z.string())
})

// #endregion

// #region SendTestCampaignDto

type SendTestCampaignDto = {
	to: string
}

const sendTestCampaignDtoSchema = z.object({
	to: z.e164("Invalid phone number")
})

// #endregion

// #region SendCampaignDto

type SendCampaignDto = {
	scheduledAt?: Date
}

const sendCampaignDtoSchema = z.object({
	scheduledAt: z.date().optional()
})

// #endregion

export {
	createCampaignDtoSchema,
	deleteManyCampaignsDtoSchema,
	sendCampaignDtoSchema,
	sendTestCampaignDtoSchema,
	updateCampaignDtoSchema,
	type CreateCampaignDto,
	type DeleteManyCampaignsDto,
	type SendCampaignDto,
	type SendTestCampaignDto,
	type UpdateCampaignDto
}

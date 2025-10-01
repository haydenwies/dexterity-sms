import { z, type ZodType } from "zod"

// #region BillingPortalSessionDto

type BillingPortalSessionDto = {
	url: string
}

type CreateBillingPortalSessionDto = {
	callbackUrl: string
}

const createBillingPortalSessionDtoSchema: ZodType<CreateBillingPortalSessionDto> = z.object({
	callbackUrl: z.string()
})

// #endregion

// #region CheckoutSessionDto

type CheckoutSessionDto = {
	url: string
}

type CreateCheckoutSessionDto = {
	callbackUrl: string
}

const createCheckoutSessionDtoSchema: ZodType<CreateCheckoutSessionDto> = z.object({
	callbackUrl: z.string()
})

// #endregion

export {
	createBillingPortalSessionDtoSchema,
	createCheckoutSessionDtoSchema,
	type BillingPortalSessionDto,
	type CheckoutSessionDto,
	type CreateBillingPortalSessionDto,
	type CreateCheckoutSessionDto
}

import z from "zod"

type ChangeSubscriptionDto = {
	subscriptionId: string
}

const changeSubscriptionDtoSchema = z.object({
	subscriptionId: z.string()
})

export { changeSubscriptionDtoSchema, type ChangeSubscriptionDto }

"use server"

import { BillingAccountModel } from "@repo/types/billing"

const getBillingAccount = async (): Promise<BillingAccountModel> => {
	return {
		id: "1",
		subscriptionId: "1",
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

export { getBillingAccount }

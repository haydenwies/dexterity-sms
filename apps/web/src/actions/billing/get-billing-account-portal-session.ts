"use server"

import { actionSuccess, type ActionResponse } from "~/lib/actions"

const getBillingAccountPortalSession = async (): Promise<ActionResponse<string>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return actionSuccess("https://google.com")
}

export { getBillingAccountPortalSession }

import "server-only"

import { routes } from "@repo/routes"
import { type CampaignModel } from "@repo/types/campaign"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const getCampaign = async (organizationId: string, campaignId: string): Promise<CampaignModel> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_CAMPAIGN(organizationId, campaignId)}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getCampaign }

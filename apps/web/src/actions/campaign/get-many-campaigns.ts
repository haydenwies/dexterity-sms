"use server"

import { routes } from "@repo/routes"
import { CampaignModel } from "@repo/types/campaign"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const getManyCampaigns = async (organizationId: string): Promise<CampaignModel[]> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_MANY_CAMPAIGNS(organizationId)}`, {
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

export { getManyCampaigns }

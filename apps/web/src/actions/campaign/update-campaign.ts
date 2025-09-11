"use server"

import { routes } from "@repo/routes"
import { UpdateCampaignDto } from "@repo/types/campaign/dto/update-campaign"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const updateCampaign = async (organizationId: string, campaignId: string, dto: UpdateCampaignDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.UPDATE_CAMPAIGN(organizationId, campaignId)}`, {
		method: "PUT",
		body: JSON.stringify(dto),
		headers: {
			"Authorization": `Bearer ${sessionToken}`,
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}
}

export { updateCampaign }

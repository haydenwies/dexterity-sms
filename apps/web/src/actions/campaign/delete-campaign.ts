"use server"

import { routes } from "@repo/routes"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendPrivateUrl } from "~/lib/url"

const deleteCampaign = async (organizationId: string, campaignId: string): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendPrivateUrl()
	const res = await fetch(`${backendUrl}${routes.backend.DELETE_CAMPAIGN(organizationId, campaignId)}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}
}

export { deleteCampaign }

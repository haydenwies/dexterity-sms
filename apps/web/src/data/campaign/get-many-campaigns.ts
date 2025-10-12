import "server-only"

import { routes } from "@repo/routes"
import { type CampaignModel } from "@repo/types/campaign"

import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getManyCampaigns = async (organizationId: string): Promise<CampaignModel[]> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	console.log("[CACHE CHECK] getManyCampaigns - Starting fetch")
	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_MANY_CAMPAIGNS(organizationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		cache: "force-cache",
		next: { tags: [CACHE_TAGS.allCampaigns(organizationId)] }
	})
	console.log("[CACHE CHECK] getManyCampaigns - Response status:", res.status)
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getManyCampaigns }

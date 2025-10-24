"use server"

import { routes } from "@dexterity-sms/routes"
import { revalidateTag } from "next/cache"

import { actionError, actionSuccess, type ActionResult } from "~/lib/actions"
import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const deleteCampaign = async (organizationId: string, campaignId: string): Promise<ActionResult> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.DELETE_CAMPAIGN(organizationId, campaignId)}`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${sessionToken}`
			}
		})
		if (!res.ok) {
			const errData = await res.json()
			return actionError(errData.message)
		}

		revalidateTag(CACHE_TAGS.allCampaigns(organizationId))
		revalidateTag(CACHE_TAGS.campaign(organizationId, campaignId))

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { deleteCampaign }

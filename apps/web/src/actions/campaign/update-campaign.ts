"use server"

import { revalidateTag } from "next/cache"

import { type UpdateCampaignDto } from "@dexterity-sms/core/campaign"
import { routes } from "@dexterity-sms/routes"

import { actionError, type ActionResult, actionSuccess } from "~/lib/actions"
import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const updateCampaign = async (
	organizationId: string,
	campaignId: string,
	dto: UpdateCampaignDto
): Promise<ActionResult> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
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
			return actionError(errData.message)
		}

		revalidateTag(CACHE_TAGS.allCampaigns(organizationId))
		// NOTE: Not revalidating cache for campaign because of auto-save + optimistic update

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { updateCampaign }

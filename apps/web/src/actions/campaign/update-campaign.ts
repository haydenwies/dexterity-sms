"use server"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type UpdateCampaignDto } from "@repo/types/campaign"
import { actionError, type ActionResult, actionSuccess } from "~/lib/actions"

import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const updateCampaign = async (
	organizationId: string,
	campaignId: string,
	dto: UpdateCampaignDto
): Promise<ActionResult> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
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

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { updateCampaign }

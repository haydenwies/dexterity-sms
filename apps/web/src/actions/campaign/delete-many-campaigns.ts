"use server"

import { type DeleteManyCampaignsDto } from "@dexterity-sms/core/campaign"
import { routes } from "@dexterity-sms/routes"
import { revalidateTag } from "next/cache"

import { actionError, type ActionResult, actionSuccess } from "~/lib/actions"
import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const deleteManyCampaigns = async (organizationId: string, dto: DeleteManyCampaignsDto): Promise<ActionResult> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.DELETE_MANY_CAMPAIGNS(organizationId)}`, {
			method: "DELETE",
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

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { deleteManyCampaigns }

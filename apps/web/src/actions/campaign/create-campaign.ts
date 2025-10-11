"use server"

import { revalidateTag } from "next/cache"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { CampaignModel, type CreateCampaignDto } from "@repo/types/campaign"

import { actionError, actionSuccess, type ActionResult } from "~/lib/actions"
import { CACHE_TAGS } from "~/lib/cache"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const createCampaign = async (organizationId: string, dto: CreateCampaignDto): Promise<ActionResult<CampaignModel>> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.CREATE_CAMPAIGN(organizationId)}`, {
			method: "POST",
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

		const data = await res.json()

		revalidateTag(CACHE_TAGS.allCampaigns(organizationId))

		return actionSuccess(data)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { createCampaign }

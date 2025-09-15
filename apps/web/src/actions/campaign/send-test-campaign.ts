"use server"

import { routes } from "@repo/routes"
import { type SendTestCampaignDto } from "@repo/types/campaign"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const sendTestCampaign = async (
	organizationId: string,
	campaignId: string,
	dto: SendTestCampaignDto
): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.SEND_TEST_CAMPAIGN(organizationId, campaignId)}`, {
		method: "POST",
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

export { sendTestCampaign }

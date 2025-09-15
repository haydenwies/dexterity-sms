"use server"

import { routes } from "@repo/routes"
import { DeleteManyCampaignsDto } from "@repo/types/campaign"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const deleteManyCampaigns = async (organizationId: string, dto: DeleteManyCampaignsDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
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
		throw new Error(errData.message)
	}
}

export { deleteManyCampaigns }

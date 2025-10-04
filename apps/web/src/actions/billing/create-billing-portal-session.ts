"use server"

import { routes } from "@repo/routes"
import { type BillingPortalSessionDto, type CreateBillingPortalSessionDto } from "@repo/types/billing"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl, getFrontendUrl } from "~/lib/url"

const createBillingPortalSession = async (organizationId: string): Promise<BillingPortalSessionDto> => {
	const sessionToken = await sessionMiddleware()

	const dto: CreateBillingPortalSessionDto = {
		callbackUrl: `${getFrontendUrl()}${routes.web.SETTINGS(organizationId)}`
	}

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.CREATE_BILLING_PORTAL_SESSION(organizationId)}`, {
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

	const data = await res.json()

	return data
}

export { createBillingPortalSession }

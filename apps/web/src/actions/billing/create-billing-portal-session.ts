"use server"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type BillingPortalSessionDto, type CreateBillingPortalSessionDto } from "@repo/types/billing"

import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl, getWebPublicUrl } from "~/lib/url"

const createBillingPortalSession = async (organizationId: string): Promise<BillingPortalSessionDto> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const dto: CreateBillingPortalSessionDto = {
		callbackUrl: `${getWebPublicUrl()}${routes.web.SETTINGS(organizationId)}`
	}

	const backendUrl = getBackendPrivateUrl()
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

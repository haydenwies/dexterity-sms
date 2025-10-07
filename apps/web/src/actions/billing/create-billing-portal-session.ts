"use server"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type BillingPortalSessionDto, type CreateBillingPortalSessionDto } from "@repo/types/billing"

import { type ActionResult, actionError, actionSuccess } from "~/lib/actions"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl, getWebPublicUrl } from "~/lib/url"

const createBillingPortalSession = async (organizationId: string): Promise<ActionResult<BillingPortalSessionDto>> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const dto: CreateBillingPortalSessionDto = {
		callbackUrl: `${getWebPublicUrl()}${routes.web.SETTINGS(organizationId)}`
	}

	try {
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
			return actionError(errData.message)
		}

		const data = await res.json()

		return actionSuccess(data)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { createBillingPortalSession }

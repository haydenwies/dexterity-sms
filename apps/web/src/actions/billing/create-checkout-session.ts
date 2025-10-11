"use server"

import { routes } from "@repo/routes"
import { type CheckoutSessionDto, type CreateCheckoutSessionDto } from "@repo/types/billing"

import { type ActionResult, actionError, actionSuccess } from "~/lib/actions"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl, getWebPublicUrl } from "~/lib/url"

const createCheckoutSession = async (organizationId: string): Promise<ActionResult<CheckoutSessionDto>> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const dto: CreateCheckoutSessionDto = {
		callbackUrl: `${getWebPublicUrl()}${routes.web.SETTINGS(organizationId)}`
	}

	try {
		const res = await fetch(`${backendUrl}${routes.backend.CREATE_CHECKOUT_SESSION(organizationId)}`, {
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

		return actionSuccess(data)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { createCheckoutSession }

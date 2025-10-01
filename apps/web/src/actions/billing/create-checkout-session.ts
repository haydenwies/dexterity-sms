"use server"

import { routes } from "@repo/routes"
import { type CheckoutSessionDto, type CreateCheckoutSessionDto } from "@repo/types/billing"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl, getFrontendUrl } from "~/lib/backend"

const createCheckoutSession = async (organizationId: string): Promise<CheckoutSessionDto> => {
	const sessionToken = await sessionMiddleware()

	const dto: CreateCheckoutSessionDto = {
		callbackUrl: `${getFrontendUrl()}${routes.web.SETTINGS(organizationId)}`
	}

	const backendUrl = getBackendUrl()
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

	return data
}

export { createCheckoutSession }

import "server-only"

import { routes } from "@repo/routes"
import { type SubscriptionModel } from "@repo/types/billing"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/url"

const getSubscription = async (organizationId: string): Promise<SubscriptionModel | undefined> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.GET_SUBSCRIPTION(organizationId)}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		if (res.status === 404) return undefined

		const errData = await res.json()
		throw new Error(errData.message)
	}

	const data = await res.json()

	return data
}

export { getSubscription }

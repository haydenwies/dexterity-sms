import "server-only"

import { type SubscriptionModel } from "@dexterity-sms/core/billing"
import { routes } from "@dexterity-sms/routes"

import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const getSubscription = async (organizationId: string): Promise<SubscriptionModel | undefined> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()
	const url = `${backendUrl}${routes.backend.GET_SUBSCRIPTION(organizationId)}`
	const res = await fetch(url, {
		method: "GET",
		headers: { "Authorization": `Bearer ${sessionToken}` },
		cache: "no-store"
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

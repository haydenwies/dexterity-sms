"use server"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type CreateContactDto } from "@repo/types/contact"

import { actionError, type ActionResult, actionSuccess } from "~/lib/actions"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const createContact = async (organizationId: string, dto: CreateContactDto): Promise<ActionResult> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.CREATE_CONTACT(organizationId)}`, {
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

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { createContact }

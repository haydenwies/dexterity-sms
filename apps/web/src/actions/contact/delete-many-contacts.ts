"use server"

import { revalidateTag } from "next/cache"

import { type DeleteManyContactsDto } from "@dexterity-sms/core/contact"
import { routes } from "@dexterity-sms/routes"

import { actionError, type ActionResult, actionSuccess } from "~/lib/actions"
import { CACHE_TAGS } from "~/lib/cache"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const deleteManyContacts = async (organizationId: string, dto: DeleteManyContactsDto): Promise<ActionResult> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.DELETE_MANY_CONTACTS(organizationId)}`, {
			method: "DELETE",
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

		revalidateTag(CACHE_TAGS.allContacts(organizationId))

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { deleteManyContacts }

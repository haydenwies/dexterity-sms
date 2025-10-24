"use server"

import { OrganizationModel, type CreateOrganizationDto } from "@dexterity-sms/core/organization"
import { routes } from "@dexterity-sms/routes"
import { redirect } from "next/navigation"

import { actionError, type ActionResult } from "~/lib/actions"
import { getSessionToken } from "~/lib/session"
import { getBackendPrivateUrl } from "~/lib/url"

const createOrganization = async (dto: CreateOrganizationDto): Promise<ActionResult> => {
	const sessionToken = await getSessionToken()
	if (!sessionToken) throw new Error("Unauthorized")

	const backendUrl = getBackendPrivateUrl()

	let data: OrganizationModel
	try {
		const res = await fetch(`${backendUrl}${routes.backend.CREATE_ORGANIZATION}`, {
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

		data = await res.json()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}

	redirect(routes.web.ORGANIZATION(data.id))
}

export { createOrganization }

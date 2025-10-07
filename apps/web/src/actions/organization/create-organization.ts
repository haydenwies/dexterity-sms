"use server"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { OrganizationModel, type CreateOrganizationDto } from "@repo/types/organization"
import { redirect } from "next/navigation"

import { actionError, type ActionResult } from "~/lib/actions"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const createOrganization = async (dto: CreateOrganizationDto): Promise<ActionResult> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
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

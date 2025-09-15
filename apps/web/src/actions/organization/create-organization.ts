"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { CreateOrganizationDto } from "@repo/types/organization"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendUrl } from "~/lib/backend"

const createOrganization = async (dto: CreateOrganizationDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const backendUrl = getBackendUrl()
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
		throw new Error(errData.message)
	}

	const data = await res.json()

	return redirect(routes.web.ORGANIZATION(data.id))
}

export { createOrganization }

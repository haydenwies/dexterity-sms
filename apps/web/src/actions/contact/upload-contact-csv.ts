"use server"

import { revalidateTag } from "next/cache"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"
import { type UploadContactCsvDto } from "@repo/types/contact"

import { actionError, type ActionResult, actionSuccess } from "~/lib/actions"
import { CACHE_TAGS } from "~/lib/cache"
import { getCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const uploadContactCsv = async (
	organizationId: string,
	file: File,
	dto: UploadContactCsvDto
): Promise<ActionResult> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	const formData = new FormData()
	formData.append("file", file)
	for (const [key, value] of Object.entries(dto)) formData.append(key, value)

	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.UPLOAD_CONTACT_CSV(organizationId)}`, {
			method: "POST",
			body: formData,
			headers: {
				"Authorization": `Bearer ${sessionToken}`
				// NOTE: Browser will set Content-Type to FormData automatically
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

export { uploadContactCsv }

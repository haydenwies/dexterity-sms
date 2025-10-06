"use server"

import { routes } from "@repo/routes"
import { type UploadContactCsvDto } from "@repo/types/contact"

import { sessionMiddleware } from "~/actions/utils"
import { getBackendPrivateUrl } from "~/lib/url"

const uploadContactCsv = async (organizationId: string, file: File, dto: UploadContactCsvDto): Promise<void> => {
	const sessionToken = await sessionMiddleware()

	const formData = new FormData()
	formData.append("file", file)
	for (const [key, value] of Object.entries(dto)) {
		formData.append(key, value)
	}

	const backendUrl = getBackendPrivateUrl()
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
		throw new Error(errData.message)
	}
}

export { uploadContactCsv }

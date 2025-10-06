"use server"

import { routes } from "@repo/routes"
import { type ForgotPasswordDto } from "@repo/types/auth"

import { getBackendPrivateUrl } from "~/lib/url"

const forgotPassword = async (dto: ForgotPasswordDto): Promise<void> => {
	const backendUrl = getBackendPrivateUrl()

	const res = await fetch(`${backendUrl}${routes.backend.FORGOT_PASSWORD}`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: {
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}
}

export { forgotPassword }

"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { type ResetPasswordDto } from "@repo/types/auth"

import { getBackendUrl } from "~/lib/url"

const resetPassword = async (dto: ResetPasswordDto): Promise<void> => {
	const backendUrl = getBackendUrl()

	const res = await fetch(`${backendUrl}${routes.backend.RESET_PASSWORD}`, {
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

	return redirect(routes.web.SIGN_IN)
}

export { resetPassword }

"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { type ResetPasswordDto } from "@repo/types/auth"

import { ActionResult, actionError } from "~/lib/actions"
import { getBackendPrivateUrl } from "~/lib/url"

const resetPassword = async (dto: ResetPasswordDto): Promise<ActionResult> => {
	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.RESET_PASSWORD}`, {
			method: "POST",
			body: JSON.stringify(dto),
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (!res.ok) {
			const errData = await res.json()
			return actionError(errData.message)
		}
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}

	redirect(routes.web.SIGN_IN)
}

export { resetPassword }

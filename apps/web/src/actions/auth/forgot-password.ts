"use server"

import { type ForgotPasswordDto } from "@dexterity-sms/core/auth"
import { routes } from "@dexterity-sms/routes"

import { actionError, actionSuccess, type ActionResult } from "~/lib/actions"
import { getBackendPrivateUrl } from "~/lib/url"

const forgotPassword = async (dto: ForgotPasswordDto): Promise<ActionResult> => {
	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.FORGOT_PASSWORD}`, {
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

		return actionSuccess()
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}
}

export { forgotPassword }

"use server"

import { routes } from "@repo/routes"
import { type ForgotPasswordDto } from "@repo/types/auth"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"

const forgotPassword = async (dto: ForgotPasswordDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

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

	return actionSuccess(undefined)
}

export { forgotPassword }

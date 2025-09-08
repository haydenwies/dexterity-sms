"use server"

import { routes } from "@repo/routes"
import { type ResetPasswordDto } from "@repo/types/auth/dto"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"

const resetPassword = async (dto: ResetPasswordDto): Promise<ActionResponse<undefined>> => {
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
		return actionError(errData.message)
	}

	return actionSuccess(undefined)
}

export { resetPassword }

"use server"

import { type ResetPasswordDto } from "@repo/types/auth/dto/reset-password"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"

const resetPassword = async (dto: ResetPasswordDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const response = await fetch(`${backendUrl}/auth/reset-password`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: {
			"Content-Type": "application/json"
		}
	})
	if (!response.ok) return actionError(response.statusText)

	return actionSuccess(undefined)
}

export { resetPassword }

"use server"

import { type ForgotPasswordDto } from "@repo/types/auth/dto/forgot-password"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"

const forgotPassword = async (dto: ForgotPasswordDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const res = await fetch(`${backendUrl}/auth/forgot-password`, {
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

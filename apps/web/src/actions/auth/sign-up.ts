"use server"

import { type SignUpDto } from "@repo/types/auth/dto/sign-up"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, setCookie } from "~/lib/cookies"

const signUp = async (dto: SignUpDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const response = await fetch(`${backendUrl}/auth/sign-up`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: {
			"Content-Type": "application/json"
		}
	})
	if (!response.ok) return actionError(response.statusText)

	const sessionToken = await response.text()
	await setCookie(Cookie.SESSION_TOKEN, sessionToken)

	return actionSuccess(undefined)
}

export { signUp }

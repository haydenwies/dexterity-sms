"use server"

import { type SignInDto } from "@repo/types/auth/dto/sign-in"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, setCookie } from "~/lib/cookies"

const signIn = async (dto: SignInDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const response = await fetch(`${backendUrl}/auth/sign-in`, {
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

export { signIn }

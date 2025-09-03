"use server"

import { type SignInDto } from "@repo/types/auth/dto/sign-in"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, setCookie } from "~/lib/cookies"

const signIn = async (dto: SignInDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const res = await fetch(`${backendUrl}/auth/sign-in`, {
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

	const sessionToken = await res.text()
	await setCookie(Cookie.SESSION_TOKEN, sessionToken)

	return actionSuccess(undefined)
}

export { signIn }

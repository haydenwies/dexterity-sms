"use server"

import { routes } from "@repo/routes"
import { type SignUpDto } from "@repo/types/auth/dto"

import { actionError, type ActionResponse, actionSuccess } from "~/lib/actions"
import { getBackendUrl } from "~/lib/backend"
import { Cookie, setCookie } from "~/lib/cookies"

const signUp = async (dto: SignUpDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const res = await fetch(`${backendUrl}${routes.backend.SIGN_UP}`, {
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

export { signUp }

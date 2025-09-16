"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { type SignInDto } from "@repo/types/auth"

import { getBackendUrl } from "~/lib/backend"
import { Cookie, setCookie } from "~/lib/cookies"

const signIn = async (dto: SignInDto): Promise<undefined> => {
	const backendUrl = getBackendUrl()
	const res = await fetch(`${backendUrl}${routes.backend.SIGN_IN}`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: {
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.message)
	}

	const sessionToken = await res.text()
	await setCookie(Cookie.SESSION_TOKEN, sessionToken)

	return redirect(routes.web.ALL_ORGANIZATIONS)
}

export { signIn }

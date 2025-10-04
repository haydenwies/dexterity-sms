"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { SESSION_COOKIE, type SignInDto } from "@repo/types/auth"

import { setCookie } from "~/lib/cookies"
import { getBackendUrl } from "~/lib/url"

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
	await setCookie(SESSION_COOKIE, sessionToken)

	return redirect(routes.web.ALL_ORGANIZATIONS)
}

export { signIn }

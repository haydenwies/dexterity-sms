"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { AUTH_COOKIE, type SignUpDto } from "@repo/types/auth"

import { getBackendUrl } from "~/lib/backend"
import { setCookie } from "~/lib/cookies"

const signUp = async (dto: SignUpDto): Promise<undefined> => {
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
		throw new Error(errData.message)
	}

	const sessionToken = await res.text()
	await setCookie(AUTH_COOKIE, sessionToken)

	return redirect(routes.web.ALL_ORGANIZATIONS)
}

export { signUp }

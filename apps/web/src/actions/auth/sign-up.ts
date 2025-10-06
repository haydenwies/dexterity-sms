"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { SESSION_COOKIE, type SignUpDto } from "@repo/types/auth"

import { setCookie } from "~/lib/cookies"
import { getBackendUrl } from "~/lib/url"

const signUp = async (dto: SignUpDto): Promise<void> => {
	const backendUrl = getBackendUrl()

	console.log(`${backendUrl}${routes.backend.SIGN_UP}`)

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
	await setCookie(SESSION_COOKIE, sessionToken)

	return redirect(routes.web.ALL_ORGANIZATIONS)
}

export { signUp }

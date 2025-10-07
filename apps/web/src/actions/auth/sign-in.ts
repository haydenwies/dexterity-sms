"use server"

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { SESSION_COOKIE, type SignInDto } from "@repo/types/auth"

import { actionError, ActionResult } from "~/lib/actions"
import { setCookie } from "~/lib/cookies"
import { getBackendPrivateUrl } from "~/lib/url"

const signIn = async (dto: SignInDto): Promise<ActionResult> => {
	const backendUrl = getBackendPrivateUrl()

	try {
		const res = await fetch(`${backendUrl}${routes.backend.SIGN_IN}`, {
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
		await setCookie(SESSION_COOKIE, sessionToken)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}

	redirect(routes.web.ALL_ORGANIZATIONS)
}

export { signIn }

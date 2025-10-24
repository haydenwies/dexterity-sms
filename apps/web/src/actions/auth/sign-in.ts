"use server"

import { redirect } from "next/navigation"

import { type SignInDto } from "@dexterity-sms/core/auth"
import { routes } from "@dexterity-sms/routes"

import { actionError, ActionResult } from "~/lib/actions"
import { setSessionToken } from "~/lib/session"
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
		await setSessionToken(sessionToken)
	} catch (err: unknown) {
		if (err instanceof Error) console.error(err.message, err.stack)

		return actionError()
	}

	redirect(routes.web.ALL_ORGANIZATIONS)
}

export { signIn }

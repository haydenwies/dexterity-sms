import "server-only"

import { cookies } from "next/headers"

import { SESSION_COOKIE } from "@repo/types/auth"
import { eTLD } from "@repo/utils"

import { getWebPublicUrl } from "~/lib/url"

const getSessionToken = async (): Promise<string | undefined> => {
	const cookieStore = await cookies()

	const sessionToken = cookieStore.get(SESSION_COOKIE)?.value
	if (!sessionToken) return undefined

	return sessionToken
}

const setSessionToken = async (token: string): Promise<void> => {
	const cookieStore = await cookies()

	const secure = process.env.APP_ENV !== "development"

	// NOTE: Set domain for non-local environments to communicate with backend (api.domain.com)
	const domain = process.env.APP_ENV !== "development" ? `.${eTLD(getWebPublicUrl())}` : undefined

	cookieStore.set(SESSION_COOKIE, token, {
		httpOnly: true,
		secure,
		sameSite: "lax",
		domain
	})
}

const deleteSessionToken = async (): Promise<void> => {
	const cookieStore = await cookies()

	const domain = process.env.APP_ENV !== "development" ? `.${eTLD(getWebPublicUrl())}` : undefined

	cookieStore.delete({ name: SESSION_COOKIE, domain })
}

export { deleteSessionToken, getSessionToken, setSessionToken }

import { SESSION_COOKIE } from "@repo/types/auth"

import { getCookie } from "~/lib/cookies"

const sessionMiddleware = async (): Promise<string> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) throw new Error("Unauthorized")

	return sessionToken
}

const safeSessionMiddleware = async (): Promise<string | undefined> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) return undefined

	return sessionToken
}

export { safeSessionMiddleware, sessionMiddleware }

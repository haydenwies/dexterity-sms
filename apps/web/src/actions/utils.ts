import { redirect } from "next/navigation"

import { routes } from "@repo/routes"
import { SESSION_COOKIE } from "@repo/types/auth"

import { getCookie } from "~/lib/cookies"

const sessionMiddleware = async (): Promise<string> => {
	const sessionToken = await getCookie(SESSION_COOKIE)
	if (!sessionToken) return redirect(routes.web.SIGN_IN)

	return sessionToken
}

export { sessionMiddleware }

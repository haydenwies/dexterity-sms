import { routes } from "@repo/routes"
import { redirect } from "next/navigation"
import { Cookie, getCookie } from "~/lib/cookies"

const sessionMiddleware = async (): Promise<string> => {
	const sessionToken = await getCookie(Cookie.SESSION_TOKEN)
	if (!sessionToken) return redirect(routes.web.SIGN_IN)

	return sessionToken
}

export { sessionMiddleware }

import { eTLD } from "@repo/utils"

import { cookies } from "next/headers"
import { getWebPublicUrl } from "./url"

const setCookie = async (name: string, value: string): Promise<void> => {
	const cookieStore = await cookies()

	const appEnv = process.env.APP_ENV || "development"

	// Set secure cookies for staging and production
	let secure: boolean = true
	if (appEnv === "development") secure = false

	// Set domain for staging and production to root eTLD
	// Required so cookie does not set "sameHost" to true
	// Allows cookie to be passed to backend subdomain from client
	// CORS sameSite uses eTLD+1 to be resolved to true or false
	let domain: string | undefined = undefined
	if (appEnv !== "development") {
		const webUrl = getWebPublicUrl()
		const domainETLD = eTLD(webUrl)
		domain = `.${domainETLD}`
	}

	cookieStore.set(name, value, {
		httpOnly: true,
		secure,
		sameSite: "lax",
		domain
	})
}

const getCookie = async (name: string): Promise<string | undefined> => {
	const cookieStore = await cookies()
	return cookieStore.get(name)?.value
}

const deleteCookie = async (name: string): Promise<void> => {
	const cookieStore = await cookies()
	cookieStore.delete(name)
}

export { deleteCookie, getCookie, setCookie }

import { cookies } from "next/headers"

const setCookie = async (name: string, value: string): Promise<void> => {
	const cookieStore = await cookies()

	const appEnv = process.env.APP_ENV || "development"

	// Set secure cookies for staging and production
	let secure: boolean = true
	if (appEnv === "development") secure = false

	// Set domain for staging and production
	// Required so cookie does not set "sameHost" to true
	// Allows cookie to be passed to other subdomains
	let domain: string | undefined = undefined
	if (appEnv !== "development") domain = `.${process.env.DOMAIN}`

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

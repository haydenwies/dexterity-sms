import { cookies } from "next/headers"

const setCookie = async (name: string, value: string): Promise<void> => {
	const cookieStore = await cookies()

	let secure: boolean
	if (process.env.APP_ENV === "production") secure = true
	else if (process.env.APP_ENV === "test") secure = true
	else secure = false

	let sameSite: "strict" | "lax" | "none"
	if (process.env.APP_ENV === "production") sameSite = "lax"
	else if (process.env.APP_ENV === "staging") sameSite = "none"
	else sameSite = "lax"

	cookieStore.set(name, value, {
		httpOnly: true,
		secure,
		sameSite
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

import { cookies } from "next/headers"

const setCookie = async (name: string, value: string): Promise<void> => {
	const cookieStore = await cookies()

	const appEnv = process.env.APP_ENV || "development"

	cookieStore.set(name, value, {
		httpOnly: true,
		secure: appEnv !== "development",
		sameSite: appEnv === "development" ? "lax" : "none",
		domain: appEnv !== "development" ? ".bytte.io" : undefined
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

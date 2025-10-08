import { cookies } from "next/headers"

const setCookie = async (name: string, value: string): Promise<void> => {
	const cookieStore = await cookies()
	cookieStore.set(name, value, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
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

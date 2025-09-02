import { cookies } from "next/headers"

enum Cookie {
	SESSION_TOKEN = "session-token"
}

const setCookie = async (name: Cookie, value: string): Promise<void> => {
	const cookieStore = await cookies()
	cookieStore.set(name, value)
}

const getCookie = async (name: Cookie): Promise<string | undefined> => {
	const cookieStore = await cookies()
	return cookieStore.get(name)?.value
}

const deleteCookie = async (name: Cookie): Promise<void> => {
	const cookieStore = await cookies()
	cookieStore.delete(name)
}

export { Cookie, deleteCookie, getCookie, setCookie }

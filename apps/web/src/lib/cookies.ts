import { cookies } from "next/headers"

const setCookie = async (name: string, value: string): Promise<void> => {
	const cookieStore = await cookies()

	let secure: boolean
	if (process.env.NODE_ENV === "production") secure = true
	else if (process.env.NODE_ENV === "test") secure = true
	else secure = false

	let sameSite: "lax" | "none" | "strict"
	if (process.env.NODE_ENV === "production") sameSite = "lax"
	else if (process.env.NODE_ENV === "test") sameSite = "none"
	else sameSite = "lax"

	console.log("sameSite: ", sameSite)

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

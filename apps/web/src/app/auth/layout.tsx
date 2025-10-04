import { redirect } from "next/navigation"

import { routes } from "@repo/routes"

import { getSession } from "~/data/auth/get-session"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getSession()
	if (session) return redirect(routes.web.ALL_ORGANIZATIONS)

	return (
		<div className="grid h-svh w-screen grid-cols-2">
			{children}
			<div className="bg-radial-[120%_180%_at_100%_70%] from-[#F472B6] to-[#A855F7]" />
		</div>
	)
}

export default AuthLayout

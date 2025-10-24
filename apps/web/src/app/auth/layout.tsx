import { redirect } from "next/navigation"

import { routes } from "@dexterity-sms/routes"

import Image from "next/image"
import { getSession } from "~/data/auth/get-session"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getSession()
	if (session) return redirect(routes.web.ALL_ORGANIZATIONS)

	return (
		<div className="grid h-svh w-screen grid-cols-2">
			<div className="flex flex-col items-center justify-center">
				<Image
					src="/logo.svg"
					alt="Logo"
					width={48}
					height={48}
				/>
				{children}
			</div>
			<div className="bg-radial-[120%_180%_at_100%_70%] from-[#86EFAC] to-[#3B82F6]" />
		</div>
	)
}

export default AuthLayout

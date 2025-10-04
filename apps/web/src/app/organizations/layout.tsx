import { redirect } from "next/navigation"

import { routes } from "@repo/routes"

import { getSession } from "~/data/auth/get-session"

type LayoutProps = Readonly<{
	children: React.ReactNode
}>
const Layout = async ({ children }: LayoutProps) => {
	const session = await getSession()
	if (!session) return redirect(routes.web.SIGN_IN)

	return children
}

export default Layout

import { redirect } from "next/navigation"

import { routes } from "@repo/routes"

const RootPage = () => {
	return redirect(routes.web.SIGN_IN)
}

export default RootPage
